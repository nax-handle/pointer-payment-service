import { hasSufficientDto } from "../dtos/wallet/has-sufficient.dto";
import { updateBalanceDto } from "../dtos/wallet/update-balance.dto";
import { BadRequest } from "../helpers/error.helper";
import Redis from "../helpers/redis.helper";
import { Wallet } from "../models/wallet.model";
import { convertToObjectId } from "../utils";

export class WalletService {
  static async updateBalance(
    updateBalanceDto: updateBalanceDto,
    isPartner: boolean
  ): Promise<void> {
    const { _id, amount, currencyID, session } = updateBalanceDto;
    const cacheKey = isPartner ? `partner:${_id}` : `user:${_id}`;
    await Redis.del(cacheKey);
    const updateCondition = isPartner
      ? { partnerID: _id, "currencies.currency": currencyID }
      : { userID: _id, "currencies.currency": currencyID };
    const result = await Wallet.updateOne(
      updateCondition,
      { $inc: { "currencies.$.balance": amount } },
      { session }
    );
    if (result.modifiedCount === 0) {
      await session.abortTransaction();
      throw new BadRequest("Error system, try again");
    }
  }

  static async hasSufficientBalance(
    hasSufficientDto: hasSufficientDto,
    isPartner: boolean
  ): Promise<void> {
    const { _id, currencyID, amount } = hasSufficientDto;
    const findCondition = isPartner ? { partnerID: _id } : { userID: _id };
    const userWallet = await Wallet.findOne(findCondition);
    const currencyBalance = userWallet.currencies.find((item) =>
      item.currency.equals(String(currencyID))
    );
    if (currencyBalance.balance < amount) {
      throw new BadRequest("Insufficient Balance");
    }
  }
  static async connectWallet(partnerId: string) {}
}

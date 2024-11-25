import Transaction from "../models/transaction.model";
import { TRANSACTION_STATUS } from "../constant/transaction-status";
import { WalletService } from "./wallet.service";
import mongoose from "mongoose";
import { TRANSACTION_TYPE } from "../constant/transaction-type";
import CurrencyService from "./currency.service";
import { withdrawMoneyDto } from "../dtos/payment/withdraw-money.dto";
import UserService from "./user.service";
export default class WithdrawService {
  static async withdrawMoney(withdrawMoneyDto: withdrawMoneyDto) {
    const { email, currency, amount, partner } = withdrawMoneyDto;
    const { _id: userID } = await UserService.findUserByEmail(email);
    const foundCurrency = await CurrencyService.getCurrencyByName(currency);
    const { _id: currencyID } = foundCurrency;
    const session = await mongoose.startSession();
    session.startTransaction();
    await WalletService.hasSufficientBalance(
      { amount, currencyID, _id: partner._id },
      true
    );

    await WalletService.updateBalance(
      {
        _id: partner._id,
        session,
        amount: -amount,
        currencyID,
      },
      true
    );
    await WalletService.updateBalance(
      {
        _id: userID,
        session,
        amount,
        currencyID,
      },
      false
    );
    const transaction = new Transaction({
      ...withdrawMoneyDto,
      receiver: userID,
      currency: currencyID,
      type: TRANSACTION_TYPE.WITHDRAW_PARTNER,
      title: "Nhận tiền từ " + partner.name,
      status: TRANSACTION_STATUS.COMPLETED,
      partnerID: partner._id,
    });
    await transaction.save({ session });
    session.commitTransaction();
  }
}

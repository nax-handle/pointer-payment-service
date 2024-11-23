import Transaction from "../models/transaction.model";
import { TRANSACTION_STATUS } from "../contains/transaction-status";
import { WalletService } from "./wallet.service";
import mongoose from "mongoose";
import { TRANSACTION_TYPE } from "../contains/transaction-type";
import CurrencyService from "./currency.service";
import { withdrawMoneyDto } from "../dtos/payment/withdraw-money.dto";
import UserService from "./user.service";
export default class WithdrawService {
  static async withdrawMoney(withdrawMoneyDto: withdrawMoneyDto) {
    const { email, currency, amount, partner } = withdrawMoneyDto;
    const user = await UserService.findUserByEmail(email);
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
        _id: user._id,
        session,
        amount,
        currencyID,
      },
      true
    );
    const transaction = new Transaction({
      ...withdrawMoneyDto,
      currency: currencyID,
      type: TRANSACTION_TYPE.WITHDRAW,
      title: "Nhận tiền từ " + partner.name,
      status: TRANSACTION_STATUS.COMPLETED,
      partnerID: partner._id,
    });
    await transaction.save({ session });
    session.commitTransaction();
  }
}

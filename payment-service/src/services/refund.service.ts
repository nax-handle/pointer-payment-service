import { BadRequest } from "../helpers/error.helper";
import { TRANSACTION_STATUS } from "../contains/transaction-status";
import TransactionService from "./transaction.service";
import { findTransactionDto } from "../dtos/transaction/find-transaction.dto";
import { WalletService } from "./wallet.service";
import mongoose from "mongoose";
import { TRANSACTION_TYPE } from "../contains/transaction-type";
import WebhookService from "./webhook.service";
import { WEBHOOK_EVENT } from "../contains/webhook-event";

export default class RefundService {
  static async refundMoney(
    findTransactionDto: findTransactionDto
  ): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();
    const transaction = await TransactionService.findTransactionRefund(
      findTransactionDto
    );
    if (
      transaction.isRefund === true ||
      transaction.status === TRANSACTION_STATUS.PENDING
    ) {
      throw new BadRequest("Transaction does not qualify.");
    }
    await TransactionService.updateRefund(transaction._id, session);
    await WalletService.hasSufficientBalance(
      {
        _id: transaction.partnerID,
        amount: transaction.amount,
        currencyID: transaction.currency,
      },
      true
    );
    await WalletService.updateBalance(
      {
        _id: transaction.sender,
        session: session,
        amount: transaction.amount,
        currencyID: transaction.currency,
      },
      false
    );
    await WalletService.updateBalance(
      {
        _id: transaction.partnerID,
        session: session,
        amount: -transaction.amount,
        currencyID: transaction.currency,
      },
      true
    );
    await TransactionService.createTransactionRefund({
      ...(transaction as any).toObject(),
      receiver: transaction.sender,
      type: TRANSACTION_TYPE.REFUND,
      session: session,
    });
    await WebhookService.requestToWebhook({
      payload: { status: 200, orderID: transaction.orderID },
      event: WEBHOOK_EVENT.PAYMENT_REFUND,
      partnerId: transaction.partnerID,
      session: session,
    });
    session.commitTransaction();
  }
}

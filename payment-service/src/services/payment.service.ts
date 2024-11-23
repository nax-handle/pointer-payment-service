import { CreateOrderDto } from "../dtos/payment.dto";
import { BadRequest, NotFound } from "../helpers/error.helper";
import Redis from "../helpers/redis.helper";
import Transaction from "../models/transaction.model";
import { Currency } from "../models/currency.model";
import { TRANSACTION_STATUS } from "../contains/transaction-status";
import TransactionService from "./transaction.service";
import { findTransactionDto } from "../dtos/transaction/find-transaction.dto";
import { WalletService } from "./wallet.service";
import mongoose from "mongoose";
import { TRANSACTION_TYPE } from "../contains/transaction-type";
import WebhookService from "./webhook.service";
import { WEBHOOK_EVENT } from "../contains/webhook-event";
export default class PaymentService {
  static async createOrder(createOrderDto: CreateOrderDto): Promise<string> {
    const { partner, currency } = createOrderDto;
    const foundCurrency = await Currency.findOne({ symbol: currency });
    if (!foundCurrency) {
      throw new NotFound("Currency not found");
    }
    const createdTransaction = await Transaction.create({
      ...createOrderDto,
      currency: foundCurrency._id,
      type: "payment",
      title: "Thanh toán hóa đơn " + partner.name,
      partnerID: partner._id,
    });
    await Redis.set(
      createdTransaction._id.toString(),
      JSON.stringify(createOrderDto.orders),
      600
    );
    return (
      process.env.PAYMENT_HOST +
      "payment-gateway?token=" +
      createdTransaction._id
    );
  }
  static async getOrder(transactionID: string) {
    const orders: any = await Redis.get(transactionID);
    const transaction = await Transaction.findById(transactionID)
      .populate({ path: "partnerID", select: "name image description" })
      .populate({ path: "currency" })
      .lean()
      .exec();
    if (transaction.status === "completed" && orders) {
      return {
        url: transaction.returnUrl,
        status: 202,
      };
    }
    if (!transaction || transaction.status === "completed" || !orders) {
      throw new NotFound("Transaction not found!");
    }
    return { ...transaction, orders: JSON.parse(orders) };
  }
  static async cancelOrder(transactionID: string): Promise<void> {
    const delOrder = await Redis.del(transactionID);
    if (delOrder !== 1) {
      throw new BadRequest("The Transaction has expired");
    }
    await TransactionService.updateStatus({
      _id: transactionID,
      status: TRANSACTION_STATUS.FAIL,
    });
  }
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
    await WalletService.hasSufficientBalance(
      {
        _id: transaction.partnerID,
        amount: transaction.amount,
        currencyID: transaction.currency,
      },
      true
    );
    await TransactionService.updateRefund(transaction._id, session);
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

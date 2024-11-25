import { CreateOrderDto } from "../dtos/payment/payment.dto";
import { BadRequest, NotFound } from "../helpers/error.helper";
import Redis from "../helpers/redis.helper";
import Transaction from "../models/transaction.model";
import { Currency } from "../models/currency.model";
import { TRANSACTION_STATUS } from "../contains/transaction-status";
import TransactionService from "./transaction.service";
import { WalletService } from "./wallet.service";
import mongoose from "mongoose";
import WebhookService from "./webhook.service";
import { WEBHOOK_EVENT } from "../contains/webhook-event";
import { connectedPaymentDto } from "../dtos/payment/connected-payment.dto";
import { ConnectWallet, IConnectWallet } from "../models/connect-wallet.model";
import CurrencyService from "./currency.service";
import { verifySignature } from "../utils";
import { findTransactionDto } from "../dtos/transaction/find-transaction.dto";
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
    if (transaction.status === TRANSACTION_STATUS.COMPLETED && orders) {
      return {
        url: transaction.returnUrl,
        status: 202,
      };
    }
    if (
      !transaction ||
      transaction.status !== TRANSACTION_STATUS.PENDING ||
      !orders
    ) {
      throw new NotFound("Transaction not found!");
    }
    return { ...transaction, orders: JSON.parse(orders) };
  }
  static async cancelOrder(
    findTransactionDto: findTransactionDto
  ): Promise<void> {
    const transaction = await TransactionService.findTransactionByOrder(
      findTransactionDto
    );
    console.log(findTransactionDto);
    const { _id: transactionID } = transaction;
    const delOrder = await Redis.del(transactionID.toString());
    if (delOrder !== 1) {
      throw new BadRequest("The Transaction has expired");
    }
    await TransactionService.updateStatus({
      _id: transactionID,
      status: TRANSACTION_STATUS.FAIL,
    });
  }

  static async connectedPayment(connectedPaymentDto: connectedPaymentDto) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { partner, signature, amount, currency, orderID } =
      connectedPaymentDto;
    const { _id: currencyID } = await CurrencyService.getCurrencyByName(
      currency
    );
    const data: IConnectWallet = await ConnectWallet.findOne({
      signature,
    });
    if (!data) {
      throw new BadRequest("Signature invalid!");
    }
    const { userID } = data;
    verifySignature(partner.privateKey, userID.toString(), signature);
    await WalletService.hasSufficientBalance(
      {
        _id: userID,
        amount: amount,
        currencyID: currencyID,
      },
      false
    );
    await WalletService.updateBalance(
      {
        _id: userID,
        session: session,
        amount: -amount,
        currencyID: currencyID,
      },
      false
    );
    await WalletService.updateBalance(
      {
        _id: partner._id,
        session: session,
        amount: amount,
        currencyID: currencyID,
      },
      true
    );
    await WebhookService.requestToWebhook({
      payload: { status: 200, orderID: orderID },
      event: WEBHOOK_EVENT.PAYMENT_SUCCEEDED,
      partnerId: partner._id,
      session: session,
    });

    const transaction = new Transaction({
      ...connectedPaymentDto,
      currency: currencyID,
      type: "payment",
      title: "Thanh toán hóa đơn " + partner.name,
      status: TRANSACTION_STATUS.COMPLETED,
      partnerID: partner._id,
    });
    await transaction.save({ session });
    session.commitTransaction();
  }
}

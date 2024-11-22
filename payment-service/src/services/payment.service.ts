import { CreateOrderDto } from "../dtos/payment.dto";
import { BadRequest, NotFound } from "../helpers/error.helper";
import Redis from "../helpers/redis.helper";
import Transaction from "../models/transaction.model";
import { Currency } from "../models/currency.model";
import { TRANSACTION_STATUS } from "../contains/transaction-status";
import TransactionService from "./transaction.service";
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
    await TransactionService.updateStatus(
      transactionID,
      TRANSACTION_STATUS.FAIL
    );
  }
}

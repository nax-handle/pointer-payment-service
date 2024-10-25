import { createOrderDto } from "../dtos/payment.dto";
import { NotFound } from "../helpers/error.helper";
import Redis from "../helpers/redis.helper";
import { v4 as uuidv4 } from "uuid";
export default class PaymentService {
  static async createOrder(createOrderDto: createOrderDto): Promise<string> {
    const id = uuidv4();
    await Redis.set(id, createOrderDto, 600);
    return process.env.PAYMENT_HOST + "/payment-gateway?token=" + id;
  }
  static async getOrder(transactionID: string) {
    const getOrder = await Redis.get(transactionID);
    if (!getOrder) {
      throw new NotFound();
    }
    return getOrder;
  }
  static async cancelOrder(transactionID: string) {
    const delOrder = await Redis.del(transactionID);
    if (delOrder !== 1) {
      throw new NotFound();
    }
    return delOrder;
  }
}

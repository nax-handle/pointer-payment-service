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
    const order = await Redis.get(transactionID);
    if (!order) {
      throw new NotFound();
    }
    return order;
  }
}

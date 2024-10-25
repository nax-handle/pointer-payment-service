import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
export class PaymentController {
  static async createOrder(req: Request, res: Response) {
    const url = await PaymentService.createOrder(req.body);
    res.json({ url });
  }
  static async getOrder(req: Request, res: Response) {
    const data = await PaymentService.getOrder(req.body.transactionID);
    res.json(data);
  }
  static cancelOrder() {}
  static refundMoney() {}

  static connectWallet() {}
  static withdrawal() {}
}

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
  static async cancelOrder(req: Request, res: Response) {
    await PaymentService.cancelOrder(req.body.transactionID);
    res.json({ message: "Cancel order successfully!" });
  }
  static refundMoney() {}

  static connectWallet() {}
  static withdrawal() {}
}

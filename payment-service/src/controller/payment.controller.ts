import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import { AuthRequest } from "../interfaces/request";
export class PaymentController {
  static async createOrder(req: AuthRequest, res: Response) {
    const url = await PaymentService.createOrder({
      ...req.body,
      partner: req.partner,
    });
    res.json({ url });
  }
  static async getOrder(req: Request, res: Response) {
    const data = await PaymentService.getOrder(req.params.id);
    res.status(200).json(data);
  }
  static async cancelOrder(req: Request, res: Response) {
    await PaymentService.cancelOrder(req.body.transactionID);
    res.json({ message: "Cancel order successfully!" });
  }
  static refundMoney() {}

  static connectWallet() {}
  static withdrawal() {}
}

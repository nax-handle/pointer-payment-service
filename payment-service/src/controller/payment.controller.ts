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
  static async cancelOrder(req: AuthRequest, res: Response) {
    await PaymentService.cancelOrder(req.body.transactionID);
    res.status(200).json({
      message: "The order has been canceled successfully!",
      status: 200,
    });
  }
  static async refundMoney(req: AuthRequest, res: Response) {
    await PaymentService.refundMoney({
      partnerID: req.partner._id,
      orderID: req.body.orderID,
    });
    res.status(200).json({
      message: "The order has been refunded successfully!",
      status: 200,
    });
  }

  static connectWallet(req: AuthRequest, res: Response) {}
  static withdrawal() {}
}

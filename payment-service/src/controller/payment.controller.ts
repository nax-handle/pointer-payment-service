import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import { AuthRequest } from "../interfaces/request";
import RefundService from "../services/refund.service";
import WithdrawService from "../services/withdraw.service";
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
    await RefundService.refundMoney({
      partnerID: req.partner._id,
      orderID: req.body.orderID,
    });
    res.status(200).json({
      message: "The order has been refunded successfully!",
      status: 200,
    });
  }
  static async connectedPayment(req: AuthRequest, res: Response) {
    await PaymentService.connectedPayment({
      ...req.body,
      partner: req.partner,
    });
    res.status(200).json({
      message: "Successfully!",
      status: 200,
    });
  }
  static async withdrawMoney(req: AuthRequest, res: Response) {
    await WithdrawService.withdrawMoney({
      ...req.body,
      partner: req.partner,
    });
    res.status(200).json({
      message: "Withdraw money successfully!",
      status: 200,
    });
  }
}

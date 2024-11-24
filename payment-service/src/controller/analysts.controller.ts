import { AuthRequest } from "../interfaces/request";
import { Response } from "express";
import AnalystsService from "../services/analysts.service";
export default class AnalystsController {
  static async getTransactions(req: AuthRequest, res: Response) {
    const { limit = 10, page = 1, status = "all" } = req.query;
    const data = await AnalystsService.getTransactions({
      limit: Number(limit),
      page: Number(page),
      partnerID: req.partner._id,
      status: status as string,
    });
    res.status(200).json({ ...data });
  }
}

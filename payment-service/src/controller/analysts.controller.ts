import { AuthRequest } from "../interfaces/request";
export default class AnalystsController {
  static async getTransactions(req: AuthRequest, res: Response) {
    const { limit = 10, page = 1 } = req.query;
    
  }
}

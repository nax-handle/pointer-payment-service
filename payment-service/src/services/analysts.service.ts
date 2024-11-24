import { getTransactionsDto } from "../dtos/analysts/get-transaction.dto";
import Transaction from "../models/transaction.model";
import TransactionRepository from "../repositories/transaction.repo";
import { cleanObject } from "../utils";

export default class AnalystsService {
  static async getTransactions(getTransactionsDto: getTransactionsDto) {
    const { limit, page, status, partnerID } = getTransactionsDto;
    const filter = cleanObject({ status, partnerID });
    const [countTransactions, transactions] = await Promise.all([
      Transaction.countDocuments(filter),
      TransactionRepository.getTransactions({
        limit,
        page,
        filter: filter,
      }),
    ]);
    return {
      total: countTransactions,
      pageCount: Math.ceil(countTransactions / limit),
      data: transactions,
    };
  }
}

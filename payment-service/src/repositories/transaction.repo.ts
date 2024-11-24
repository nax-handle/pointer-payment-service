import { getTransactionsRepoDto } from "../dtos/analysts/get-transaction.dto";
import Transaction from "../models/transaction.model";

export default class TransactionRepository {
  static async getTransactions(getTransactionsRepoDto: getTransactionsRepoDto) {
    const { filter, page, limit } = getTransactionsRepoDto;
    console.log(getTransactionsRepoDto);
    return await Transaction.find(filter)
      .populate({ path: "sender", select: "_id email full_name avatar " })
      .populate({ path: "receiver", select: "_id email full_name avatar " })
      .populate({ path: "currency", select: "_id symbol name" })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();
  }
}

import { BadRequest } from "../helpers/error.helper";
import Transaction from "../models/transaction.model";
import { convertToObjectId } from "../utils";

export default class TransactionService {
  static async updateStatus(
    transactionID: string,
    status: String
  ): Promise<void> {
    const updatedTransaction = await Transaction.updateOne(
      { _id: convertToObjectId(transactionID) },
      {
        status: status,
      }
    );
    if (updatedTransaction.modifiedCount !== 1) {
      throw new BadRequest("Transaction update failed, try again.");
    }
  }
}

import { ClientSession, Schema, Types } from "mongoose";
import { createTransactionRefundDto } from "../dtos/transaction/create-transaction.dto";
import { findTransactionDto } from "../dtos/transaction/find-transaction.dto";
import { updateStatusDto } from "../dtos/transaction/update-status.dto";
import { BadRequest } from "../helpers/error.helper";
import Transaction, { ITransaction } from "../models/transaction.model";

export default class TransactionService {
  static async updateStatus(updateStatusDto: updateStatusDto): Promise<void> {
    const { _id, status } = updateStatusDto;
    const updatedTransaction = await Transaction.updateOne(
      { _id: _id },
      {
        status: status,
      }
    );
    if (updatedTransaction.modifiedCount !== 1) {
      throw new BadRequest("Transaction update failed, try again.");
    }
  }
  static async updateRefund(
    _id: Schema.Types.ObjectId,
    session: ClientSession
  ): Promise<void> {
    const updatedTransaction = await Transaction.updateOne(
      { _id },
      { isRefund: true },
      { session }
    );
    if (updatedTransaction.modifiedCount !== 1) {
      await session.abortTransaction();
      throw new BadRequest("Transaction update failed, try again.");
    }
  }
  static async createTransactionRefund(
    createTransactionRefundDto: createTransactionRefundDto
  ): Promise<void> {
    const { session } = createTransactionRefundDto;
    const transaction = new Transaction({
      ...createTransactionRefundDto,
      _id: new Types.ObjectId(),
      isRefund: true,
      sender: null,
    });
    await transaction.save({
      session,
    });
  }
  static async findTransactionByOrder(
    findTransactionDto: findTransactionDto
  ): Promise<ITransaction> {
    const { orderID, partnerID } = findTransactionDto;
    const transactions = await Transaction.findOne({
      orderID,
      partnerID: partnerID,
    });
    if (!transactions) {
      throw new BadRequest("Transaction not found!");
    }
    return transactions;
  }
}

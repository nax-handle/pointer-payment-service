import mongoose, { Schema, model } from "mongoose";
export interface ITransaction {
  _id: Schema.Types.ObjectId;
  type: string;
  amount: number;
  title?: string;
  message?: string;
  status: string;
  currency: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  partnerID?: Schema.Types.ObjectId;
  userID?: string;
  orderID?: string;
  returnUrl?: string;
  isRefund: boolean;
}
const transactionSchema = new Schema<ITransaction>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    type: {
      type: String,
      required: true,
      enum: ["transfer", "payment", "deposit", "withdraw", "refund"],
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "fail", "refund"],
      default: "pending",
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
      required: true,
    },
    partnerID: {
      type: Schema.Types.ObjectId,
      ref: "Partner",
      required: false,
    },
    userID: {
      type: String,
    },
    orderID: {
      type: String,
    },
    isRefund: {
      type: Boolean,
      default: false,
    },
    returnUrl: String,
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
export default Transaction;

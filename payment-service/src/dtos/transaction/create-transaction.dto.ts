import { ClientSession, Schema } from "mongoose";

export interface createTransactionRefundDto {
  type: string;
  amount: number;
  title?: string;
  message?: string;
  status: string;
  currency: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  partnerID?: Schema.Types.ObjectId;
  userID?: string;
  orderID?: string;
  returnUrl?: string;
  isRefund: boolean;
  session: ClientSession;
}

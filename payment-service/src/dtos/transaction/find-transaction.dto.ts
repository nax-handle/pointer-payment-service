import { Schema } from "mongoose";

export interface findTransactionDto {
  orderID: string;
  partnerID: Schema.Types.ObjectId;
}

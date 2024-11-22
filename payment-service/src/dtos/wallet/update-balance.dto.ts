import { ClientSession, Schema } from "mongoose";

export interface updateBalanceDto {
  _id: Schema.Types.ObjectId;
  currencyID: Schema.Types.ObjectId;
  amount: number;
  session: ClientSession;
}

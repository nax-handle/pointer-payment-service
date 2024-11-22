import { Schema } from "mongoose";

export interface hasSufficientDto {
  _id: Schema.Types.ObjectId;
  currencyID: Schema.Types.ObjectId;
  amount: number;
}

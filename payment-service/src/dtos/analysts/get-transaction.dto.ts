import { Schema } from "mongoose";

export interface getTransactionsDto {
  limit: number;
  page: number;
  partnerID: Schema.Types.ObjectId;
  status: string;
}
export interface getTransactionsRepoDto {
  filter: unknown;
  limit: number;
  page: number;
}

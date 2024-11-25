import { Schema } from "mongoose";

export interface updateStatusDto {
  _id: Schema.Types.ObjectId;
  status: string;
}

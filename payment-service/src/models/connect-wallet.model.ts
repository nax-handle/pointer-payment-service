import { Schema, model } from "mongoose";

export interface IConnectWallet {
  userID: Schema.Types.ObjectId;
  partnerID: Schema.Types.ObjectId;
  signature: string;
}
const connectWalletSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    partnerID: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    signature: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
export const ConnectWallet = model("ConnectWallet", connectWalletSchema);

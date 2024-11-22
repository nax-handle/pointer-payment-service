import { Schema, model } from "mongoose";

const currencySchema = new Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const walletSchema = new Schema(
  {
    address: {
      type: String,
      required: false,
    },
    mnemonic: {
      type: String,
      required: false,
    },
    userID: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
      index: true,
    },
    partnerID: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Partner",
      index: true,
    },
    currencies: [
      {
        balance: {
          type: Number,
          default: 0,
          required: true,
          min: 0,
        },
        currency: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Currency",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Currency = model("Currency", currencySchema);
export const Wallet = model("Wallet", walletSchema);

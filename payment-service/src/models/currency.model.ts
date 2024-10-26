import { model, Schema } from "mongoose";

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
export const Currency = model("Currency", currencySchema);

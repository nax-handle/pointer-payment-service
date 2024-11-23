import { model, Schema } from "mongoose";
export interface ICurrency {
  _id: Schema.Types.ObjectId;
  symbol: string;
  name: string;
  image: string;
}
const currencySchema = new Schema<ICurrency>(
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

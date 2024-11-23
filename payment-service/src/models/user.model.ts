import { Schema, model } from "mongoose";
export interface IUser {
  _id: Schema.Types.ObjectId;
  full_name: string;
  avatar: string;
  email: string;
  phone: string;
  password: string;
  security_code: string;
  inactive: boolean;
}
const userSchema = new Schema<IUser>(
  {
    full_name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    security_code: {
      type: String,
    },
    inactive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model("User", userSchema);

import { Model, Schema, model } from "mongoose";
import { IPartner } from "../interfaces/partner";
const partnerSchema = new Schema<IPartner, Model<IPartner>>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "../assets/img.png",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
    },
    publicKey: {
      type: String,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
    webhook: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Partner = model("Partner", partnerSchema);
export default Partner;

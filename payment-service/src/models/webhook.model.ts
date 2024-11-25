import { Schema, model } from "mongoose";
import { WEBHOOK_EVENT } from "../constant/webhook-event";
const webhookSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      enum: Object.values(WEBHOOK_EVENT),
      required: true,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: "Partner",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Webhook = model("Webhook", webhookSchema);

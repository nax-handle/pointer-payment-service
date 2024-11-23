import { ClientSession, Schema } from "mongoose";

export interface requestWebhookDto {
  event: string;
  partnerId: Schema.Types.ObjectId;
  payload: any;
  session: ClientSession;
}

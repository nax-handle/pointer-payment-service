import { requestWebhookDto } from "../dtos/webhook/request-webhook.dto";
import { BadRequest } from "../helpers/error.helper";
import { Webhook } from "../models/webhook.model";
import axios from "axios";
export default class WebhookService {
  static async requestToWebhook(
    requestWebhookDto: requestWebhookDto
  ): Promise<void> {
    const { payload, event, partnerId, session } = requestWebhookDto;
    const data = await Webhook.findOne(
      {
        partner: partnerId,
        event,
      },
      null,
      { session }
    );
    if (!data) {
      await session.abortTransaction();
      throw new BadRequest("Webhook event not found!");
    }
    try {
      await axios.post(data.url, payload);
    } catch (e) {
      await session.abortTransaction();
      throw new BadRequest("Error from partner");
    }
  }
}

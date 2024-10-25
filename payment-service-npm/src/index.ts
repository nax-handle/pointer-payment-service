import axios, { AxiosInstance } from "axios";
import { createOrderDto, resCancelOrderDto } from "./types";

export class Pointer {
  private apiKey: string;
  private instance: AxiosInstance;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.instance = axios.create({
      baseURL: "https://api-presspay.azurewebsites.net",
      timeout: 10000,
      headers: {
        Authorization: this.apiKey,
      },
    });
  }
  createPayment = async (body: createOrderDto): Promise<createOrderDto> => {
    try {
      const response = await this.instance.post(
        "/api/payment/create-order",
        body
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  cancelOrder = async (transactionID: string): Promise<resCancelOrderDto> => {
    try {
      const response = await this.instance.post(
        "/api/payment/cancel-order",
        transactionID
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}


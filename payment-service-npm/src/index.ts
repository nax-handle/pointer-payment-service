import axios, { AxiosInstance } from "axios";
import { createOrderDto, resCancelOrderDto, resCreateOrderDto } from "./types";
export class Pointer {
  private secretKey: string;
  private instance: AxiosInstance;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.instance = axios.create({
      baseURL: "https://api.pointer.io.vn",
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    });
  }
  createPayment = async (body: createOrderDto): Promise<resCreateOrderDto> => {
    try {
      const response = await this.instance.post(
        "/api/payment/create-order",
        body
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status == 401) {
        throw new Error("Secret key invalid");
      }
      throw new Error(error.response.data.message);
    }
  };
  cancelOrder = async (transactionID: string): Promise<resCancelOrderDto> => {
    try {
      const response = await this.instance.post("/api/payment/cancel-order", {
        transactionID,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };
}

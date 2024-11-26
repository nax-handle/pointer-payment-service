import axios, { AxiosInstance } from "axios";
import {
  connectedPaymentDto,
  createOrderDto,
  resCancelOrderDto,
  resCreateOrderDto,
  withdrawMoneyDto,
} from "./types";
export class Pointer {
  private secretKey: string;
  private instance: AxiosInstance;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.instance = axios.create({
      baseURL: "https://api.pointer.io.vn/api/payment",
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
      withCredentials: false,
    });
  }
  createPayment = async (body: createOrderDto): Promise<resCreateOrderDto> => {
    try {
      const response = await this.instance.post("/create-order", body);
      return response.data;
    } catch (error: any) {
      if (error?.response?.status == 401) {
        throw new Error("Secret key invalid");
      }
      throw new Error(error.response.data.message);
    }
  };
  cancelOrder = async (orderID: string): Promise<resCancelOrderDto> => {
    try {
      const response = await this.instance.post("/cancel-order", {
        orderID,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };
  refundMoney = async (orderID: string) => {
    try {
      const response = await this.instance.post("/refund", {
        orderID,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };
  withdrawMoney = async (body: withdrawMoneyDto) => {
    try {
      const response = await this.instance.post("/withdraw", body);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };
  connectedPayment = async (body: connectedPaymentDto) => {
    try {
      const response = await this.instance.post(
        "/connect-wallet/payment",
        body
      );
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      throw new Error(error.response.data.message);
    }
  };
}

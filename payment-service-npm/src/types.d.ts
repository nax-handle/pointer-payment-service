export interface createOrderDto {
  amount: number;
  currency: "VND" | "USD" | "ETH";
  message: string;
  userID: string;
  providerID?: string;
  orderID: string;
  returnUrl: string;
  orders?: {
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
  }[];
}
export interface withdrawMoneyDto {
  email: string;
  currency: string;
  amount: number;
}
export interface resCancelOrderDto {
  status: number;
  message: string;
}

export interface resCreateOrderDto {
  url: string;
}
export interface connectedPaymentDto {
  signature: string;
  amount: number;
  currency: string;
  message: string;
  userID: string;
  orderID: string;
  providerID?: string;
  returnUrl: string;
}

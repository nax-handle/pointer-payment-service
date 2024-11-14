export interface createOrderDto {
  amount: number;
  currency: "VND" | "USD" | "ETH";
  message: string;
  userID: string;
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
export interface resCancelOrderDto {
  status: number;
  message: string;
}

export interface resCreateOrderDto {
  url: string;
}

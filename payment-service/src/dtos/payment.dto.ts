export interface createOrderDto {
  amount: number;
  currency: "VND" | "USD" | "ETH";
  message: string;
  userID?: string;
  orderID: string;
  orders?: {
    name: string;
    image: string;
    description: string;
    quantity: string;
    price: string;
  }[];
  returnUrl: string;
}

import { IPartner } from "../../interfaces/partner";
export interface CreateOrderDto {
  amount: number;
  currency: "VND" | "USD" | "ETH";
  message: string;
  userID: string;
  orderID: string;
  returnUrl: string;
  partner: IPartner;
  orders?: {
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
  }[];
}

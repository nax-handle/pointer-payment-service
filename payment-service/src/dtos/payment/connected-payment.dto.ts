import { IPartner } from "../../interfaces/partner";
export interface connectedPaymentDto {
  signature: string;
  amount: number;
  currency: "VND" | "USD" | "ETH";
  message: string;
  userID: string;
  orderID: string;
  returnUrl: string;
  partner: IPartner;
}

import { IPartner } from "../../interfaces/partner";

export interface withdrawMoneyDto {
  email: string;
  amount: number;
  currency: string;
  partner: IPartner;
}

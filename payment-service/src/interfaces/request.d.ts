import { IPartner } from "../interfaces/partner";
import { Request } from "express";
export interface AuthRequest extends Request {
  partner: IPartner;
}

import { NextFunction, Request, Response } from "express";
import { PaymentRequired, UnAuthorized } from "../helpers/error.helper";
import Partner from "../models/partner.model";
import catchError from "../helpers/catch.error";
import { AuthRequest } from "../interfaces/request";


export const authenticationPartner = catchError(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (!token) {
      throw new UnAuthorized();
    }
    const data = await Partner.findOne({ privateKey: token });
    if (!data) {
      throw new UnAuthorized();
    }
    console.log(data);
    if (!data?.webhook) {
      throw new PaymentRequired(
        "Webhooks must be configured before taking action"
      );
    }
    if (data) {
      req.partner = data;
      next();
    }
  }
);

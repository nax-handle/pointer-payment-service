import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../helpers/error.helper";
export default function errorHandler(
  error: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  res
    .status(error.status || 500)
    .json({ message: error.message, status: error.status || 500 });
}

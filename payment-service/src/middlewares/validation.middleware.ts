import { NextFunction, Request, Response } from "express";
import catchError from "../helpers/catch.error";
import { Schema } from "yup";
export const validate = (schema: Schema) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    await schema.validate(req.body);
    next();
  });

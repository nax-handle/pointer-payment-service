import { Request, Response, NextFunction } from "express";
const catchError = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next)?.catch(next);
  };
};
export default catchError;

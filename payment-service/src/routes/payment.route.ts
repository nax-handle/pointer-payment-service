import express from "express";
const router = express.Router();
import { validate } from "../middlewares/validation.middleware";
import { orderSchema } from "../validations/payment.validation";
import { authenticationPartner } from "../middlewares/auth.middleware";
import { PaymentController } from "../controller/payment.controller";
import catchError from "../helpers/catch.error";
router.post(
  "/create-order",
  authenticationPartner,
  validate(orderSchema),
  catchError(PaymentController.createOrder)
);
router.get("/get-order/:id", catchError(PaymentController.getOrder));
router.post(
  "/cancel-order",
  authenticationPartner,
  catchError(PaymentController.cancelOrder)
);

export default router;

import express from "express";
const router = express.Router();
import { validate } from "../middlewares/validation.middleware";
import { orderSchema } from "../validations/payment.validation";
import { authenticationPartner } from "../middlewares/auth.middleware";
import { PaymentController } from "../controller/payment.controller";
import catchError from "../helpers/catch.error";

router.get("/get-order/:id", catchError(PaymentController.getOrder));
router.use(authenticationPartner);
router
  .post(
    "/create-order",
    validate(orderSchema),
    catchError(PaymentController.createOrder)
  )
  .post("/cancel-order", catchError(PaymentController.cancelOrder))
  .post("/refund", catchError(PaymentController.refundMoney))
  .post(
    "/connect-wallet/payment",
    catchError(PaymentController.connectedPayment)
  );

export default router;

import express from "express";
const router = express.Router();
import routePayment from "../routes/payment.route";
import routeAnalysts from "../routes/analysts.route";
router.use("/payment", routePayment);
router.use("/analysts", routeAnalysts);

export default router;

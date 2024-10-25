import express from "express";
const router = express.Router();
import routePayment from "../routes/payment.route";

router.use("/payment", routePayment);


export default router;

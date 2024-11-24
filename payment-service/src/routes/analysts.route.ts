import express from "express";
const router = express.Router();
import { authenticationPartner } from "../middlewares/auth.middleware";
import AnalystsController from "../controller/analysts.controller";
import catchError from "../helpers/catch.error";

router.use(authenticationPartner);
router.get("/transaction", catchError(AnalystsController.getTransactions));

export default router;

import { Router } from "express";
import {   paymentAdd } from "../controllers/payment.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/checkout").post(isAuthenticated,paymentAdd)




export default router;
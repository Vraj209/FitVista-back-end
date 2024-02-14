import { Router } from "express";
import { payment, success } from "../controllers/payment.controller.js";
const router = Router();

router.route("/pay").post(payment)
router.route("/sucess").get(success)


export default router;
import { Router } from "express";
import { signup, signin, logout } from "../controllers/user.controller.js";
const router = Router();

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/logout").get(logout)

export default router;

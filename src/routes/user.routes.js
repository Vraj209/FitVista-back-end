import { Router } from "express";
import { signup, signin, logout,changePassword } from "../controllers/user.controller.js";
const router = Router();

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/changePassword").post(changePassword)
router.route("/logout").get(logout)

export default router;

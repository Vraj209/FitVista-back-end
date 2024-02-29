import { Router } from "express";
import { signup, signin, logout, changePassword, forgotPassword } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/changePassword").post(changePassword)
router.route("/forgotPassword").post(forgotPassword)
router.route("/logout").get(logout)

export default router;

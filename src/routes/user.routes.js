import { Router } from "express";
import { signup, signin, logout, changePassword, forgotPassword, totalUser, getUser, assignTrainer, currentUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { assign } from "nodemailer/lib/shared/index.js";
const router = Router();

router.route("/currentUser").get(isAuthenticated, currentUser);
router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/changePassword").post(changePassword)
router.route("/forgotPassword").post(forgotPassword)
router.route("/logout").get(logout)
router.route("/totalUser").get(totalUser)
router.route("/getUser/:id").get(getUser)
router.route("/trainerAssign/:id").put(assignTrainer)

// router.route("/getTrainers").get(getTrainers)

export default router;

import { Router } from "express";
import {
  signup,
  signin,
  logout,
  changePassword,
  forgotPassword,
  totalUser,
  getUser,
  assignTrainer,
  currentUser,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import { assign } from "nodemailer/lib/shared/index.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").get(logout);

router.route("/currentUser").get(isAuthenticated, currentUser);
router.route("/changePassword").post(changePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/getUser/:id").get(getUser);

// Admin routes
router.route("/totalUser").get(isAuthenticated, totalUser);
router.route("/trainerAssign/:id").put(isAuthenticated, assignTrainer);

// router.route("/getTrainers").get(getTrainers)

export default router;

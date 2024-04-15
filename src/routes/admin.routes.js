import { Router } from "express";
import { AssignTrainer } from "../controllers/admin.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
const router = Router();

router
  .route("/updateTrainer/:id")
  .put(isAuthenticated, authorizeRoles("admin"), AssignTrainer);

export default router;

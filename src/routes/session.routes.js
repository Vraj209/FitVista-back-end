import { Router } from "express";
import {
    createSession,
    getAllSessions,
    getSessionById,
    updateSessionById,
    deleteSessionById,
    getSessionsByUsername // Import the new function
} from "../controllers/session.controller.js"; // Make sure to import the new function

import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/sessions").post(isAuthenticated, createSession);
router.route("/sessions").get(isAuthenticated, getAllSessions);
router.route("/sessions/:id").get(isAuthenticated, getSessionById);
router.route("/sessions/:id").put(isAuthenticated, updateSessionById);
router.route("/sessions/:id").delete(isAuthenticated, deleteSessionById);

// New route to get sessions by username
router.route("/sessions/username/:username").get(isAuthenticated, getSessionsByUsername);

export default router;

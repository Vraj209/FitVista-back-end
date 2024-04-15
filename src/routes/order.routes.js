import express from "express";
import { Order } from "../models/order.model.js"; // Adjust path as needed
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addOrder, getOrderDetails } from "../controllers/order.controller.js";

const router = express.Router();

// Fetch order details by order number
router.route("getOrder/:orderNumber").get(isAuthenticated, getOrderDetails);

// Add new order 
router.route("/addOrder").post(isAuthenticated, addOrder);

export default router;

import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Getting Order Details
const getOrderDetails = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error });
  }
});

// Add Order Details
const addOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error saving new order", error });
  }
});

export { getOrderDetails, addOrder };

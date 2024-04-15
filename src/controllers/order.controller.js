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
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching order details", error: error });
  }
});

// Add Order Details
const addOrder = asyncHandler(async (req, res) => {
  try {
    const newOrder = new Order({
      orderNumber: req.body.orderNumber,
      total: req.body.total,
      products: req.body.products,
      shippingInfo: req.body.shippingInfo,
      paymentInfo: req.body.paymentInfo,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating new order", error: error });
  }
});

export { getOrderDetails, addOrder };

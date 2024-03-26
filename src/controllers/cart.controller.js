import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
  try {
    // Verify and decode the token
    const userId = req.user.id; // Extract userId from decoded token
    const { id, name, price, quantity, category, image } = req.body;
    console.log("userId", userId);
    // Find the user's cart
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      // If the user doesn't have a cart, create a new one
      userCart = new Cart({
        userId,
        items: [{ id, name, price, quantity, category, image }],
      });
    } else {
      // Check if the item already exists in the user's cart
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        userCart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the item is not in the cart, add it to the cart
        userCart.items.push({ id, name, price, quantity, category, image });
      }
    }

    await userCart.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: userCart,
      status: 200,
    });
  } catch (error) {
    console.error("Error adding item to cart", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

const getCartByUserId = asyncHandler(async (req, res) => {
  try {
    // Extract userId from decoded token (assuming user is authenticated)
    const userId = req.user.id;

    // Find the cart data for the specified user
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      // If the user doesn't have a cart, return a 404 Not Found response
      res
        .status(404)
        .json({ message: "Cart not found for the user", status: 404 });
    } else {
      // If the user has a cart, return the cart data
      res.status(200).json({
        message: "Cart data retrieved successfully",
        cart: userCart,
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error retrieving cart data:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  try {
    // Extract userId from decoded token (assuming user is authenticated)
    const userId = req.user.id;
    const productIdToRemove = req.params.productId; // Assuming productId is passed as a route parameter

    // Find the cart data for the specified user
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      // If the user doesn't have a cart, return a 404 Not Found response
      return res
        .status(404)
        .json({ message: "Cart not found for the user", status: 404 });
    }

    // Find the index of the product to remove from the cart
    const productIndex = userCart.items.findIndex(
      (item) => item.id === productIdToRemove
    );

    if (productIndex === -1) {
      // If the product is not found in the cart, return a 404 Not Found response
      return res
        .status(404)
        .json({ message: "Product not found in the cart", status: 404 });
    }

    // Remove the product from the cart
    userCart.items.splice(productIndex, 1);

    // Save the updated cart to the database
    await userCart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: userCart,
      status: 200,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});
const emptyCart = asyncHandler(async (req, res) => {
  try {
    // Extract userId from decoded token (assuming user is authenticated)
    const userId = req.user.id;

    // Find and delete the cart data for the specified user
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
      // If the user doesn't have a cart, return a 404 Not Found response
      return res
        .status(404)
        .json({ message: "Cart not found for the user", status: 404 });
    }

    res.status(200).json({
      message: "Cart emptied successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error emptying cart:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

export { addItemToCart, getCartByUserId, removeProductFromCart, emptyCart };

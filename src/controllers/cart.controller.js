import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add to cart
const addItemToCart = asyncHandler(async (req, res) => {
  try {
    // Output to check incoming structure
    console.log("Received body:", req.body);

    const userId = req.user.id; // Assuming authentication has correctly populated req.user
    const { id, name, price, description, shortDescription, category, image } =
      req.body.product_Data;

    console.log("Product details:", {
      id,
      name,
      price,
      description,
      shortDescription,
      category,
      image,
    });

    // Find the user's existing cart or create a new one
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      // Create a new cart if not found
      userCart = new Cart({
        userId,
        items: [
          {
            id,
            name,
            price,
            description,
            quantity: 1,
            shortDescription,
            category,
            image,
          },
        ],
      });
    } else {
      // Check if the item already exists in the user's cart
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        userCart.items[existingItemIndex].quantity += 1;
      } else {
        // Otherwise, add the new item to the cart
        userCart.items.push({
          id,
          name,
          price,
          description,
          quantity: 1,
          shortDescription,
          category,
          image,
        });
      }
    }

    // Save the updated cart
    await userCart.save();
    res.status(200).json({
      message: "Item added to cart successfully",
      cart: userCart,
    });
  } catch (error) {
    console.error("Error adding item to cart", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

// Get cart user by id
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

// Remove Product
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

// Empty Cart
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

// Update Quntity
const updateItemQuantity = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  console.log("itemId", itemId);
  console.log("Quantity Received:", quantity);

  const userId = req.user.id; // Ensure that you are getting user ID from either session or token

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    item.quantity = quantity; // Update the quantity
    await cart.save();
    res.send({ message: "Quantity updated", cart });
  } catch (error) {
    console.error("Failed to update cart item quantity:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export {
  addItemToCart,
  getCartByUserId,
  removeProductFromCart,
  emptyCart,
  updateItemQuantity,
};

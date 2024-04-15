import { Router } from "express";
import {
  addItemToCart,
  getCartByUserId,
  removeProductFromCart,
  emptyCart,
  updateItemQuantity,
} from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addItemtoCart").post(isAuthenticated, addItemToCart);
router.route("/updateItem/:itemId").patch(isAuthenticated, updateItemQuantity);
router.route("/cartItems").get(isAuthenticated, getCartByUserId);
router
  .route("/removeItem/:productId")
  .delete(isAuthenticated, removeProductFromCart);
router.route("/empty").delete(isAuthenticated, emptyCart);
export default router;

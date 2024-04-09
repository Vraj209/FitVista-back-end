import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authRole.middleware.js";
const router = Router();

router
  .route("/addProduct")
  .post(isAuthenticated, authorizeRoles("admin"), addProduct);
router
  .route("/deleteProduct/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router
  .route("/updateProduct/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router.route("/getProducts").get(getProducts);
router.route("/getProduct/:id").get(getProduct);

export default router;

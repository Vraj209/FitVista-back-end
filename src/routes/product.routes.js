import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/addProduct").post(addProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/getProducts").get(getProducts);
router.route("/getProduct/:id").get(getProduct);
router.route("/updateProduct/:id").put(updateProduct);

export default router;

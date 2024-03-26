import { Router } from "express";
import {
  addBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addBlog").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addBlog
);
router.route("/getBlogs").get(getBlogs);
router.route("/getBlog/:id").get(getBlog);
router.route("/updateBlog/:id").put(updateBlog);
router.route("/deleteBlog/:id").delete(deleteBlog);

export default router;

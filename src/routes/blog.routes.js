import { Router } from "express";
import {
  addBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";
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
router.route("/getBlogs").get(isAuthenticated,getBlogs);
router.route("/getBlog/:id").get(isAuthenticated,getBlog);
router.route("/updateBlog/:id").put(isAuthenticated,authorizeRoles("admin","trainer"),updateBlog);
router.route("/deleteBlog/:id").delete(isAuthenticated,authorizeRoles("admin","trainer"),deleteBlog);

export default router;

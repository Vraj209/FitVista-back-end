import express from "express";
import {  uploadTraining,getVideoById,updateVideo,deleteVideo, getAllVideos} from "../controllers/training.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();


    
router.post("/upload", upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), isAuthenticated,uploadTraining);
router.get("/content/:videoId",getVideoById);
router.get("/content/videos",isAuthenticated,getAllVideos);
router.put("/updatevideo/:videoId",updateVideo);
router.delete("/deletevideo/:videoId",deleteVideo)
export default router;

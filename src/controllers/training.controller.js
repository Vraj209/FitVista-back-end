import { Training } from "../models/training.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";

// Add Video
const uploadTraining = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, duration } = req.body;
    const userId = req.user.id;
    console.log(userId);
    const videoFile = await uploadOnCloudinary(req.files["video"][0].path); // Upload the video file
    const thumbnail = await uploadOnCloudinary(req.files["thumbnail"][0].path); // Upload the thumbnail
    if (!videoFile || !thumbnail) {
      throw new Error("Failed to upload file(s) to Cloudinary");
    }
    const newTraining = new Training({
      videoFile: videoFile.url,
      thumbnail: thumbnail.url,
      title,
      description,
      duration,
      owner: userId,
    });

    await newTraining.save();
    if (newTraining) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "aproject7799@gmail.com",
          pass: "elwmgxaxkmkxaxna",
        },
      });
      console.log("userId", userId);
      const user = await User.find({ role: "user", trainer: userId });
      console.log(user);
      for (var i = 0; i < user.length; i++) {
        const mailOptions = {
          from: "aproject7799@gmail.com",
          to: user[i]["email"],
          subject: "New Content Uploaded !!",
          html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #007bff;
                    }
                    p {
                        line-height: 1.6;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>New Content Uploaded !!</h1>
                    <p>Dear ${user[i].firstName},</p>
                    <p>We are excited to inform you that new content has been uploaded to our site.</p>
                    <p>Please visit our site to check it out.</p>
                    <p>Thank you for being a valued member!</p>
                </div>
            </body>
        </html>
    `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
          }
        });
      }

      console.log(user);
    }
    res.status(201).json({ message: "Training video uploaded successfully" });
  } catch (error) {
    console.error("Error uploading training video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//   Get video by Id
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Training.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }
    res.status(200).json({ video });
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

//  Update Video
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  try {
    const video = await Training.findByIdAndUpdate(
      videoId,
      { title, description },
      { new: true }
    );
    if (!video) {
      throw new ApiError(404, "Video not found");
    }
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error("Error updating video:", error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// Delete Video
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  try {
    const deletedVideo = await Training.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      throw new ApiError(404, "Video not found");
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Training.find({}); // Fetch all video entries from the database
    console.log(videos);
    res.status(200).json(videos); // Send the list of videos as a response
  } catch (error) {
    console.error("Error fetching videos:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
export { uploadTraining, getVideoById, updateVideo, deleteVideo, getAllVideos };

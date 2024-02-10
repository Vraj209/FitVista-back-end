import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    // check if user already exists
    const user
});

export { registerUser };

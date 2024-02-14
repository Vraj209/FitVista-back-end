import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Register a new user
const signup = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const passowrdHashed = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: passowrdHashed,
      role,
    });
    await user.save();
    res.status(200).json({ message: "User Signup successfully", status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, Status: 500 });
  }
});

// login user
const signin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (matchPassword) {
        req.session.userid = user._id;
        // res.redirect("/");
        res.status(200).json({ message: "SignIn successfully", Status: 200 });
      } else {
        res.status(500).json({ message: "password wrong", Status: 500 });
      }
    } else {
      res.status(500).json({ message: "User not exist", Status: 500 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, Status: 500 });
  }
});

// logout user
const logout = asyncHandler(async (req, res) => {
  try {
    req.session.destroy(() => {
      // res.redirect("/");
      res.status(200).json({ message: "User Logout", Status: 200 });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, Status: 500 });
  }
});

export { signup, signin, logout };

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
    const { firstName, lastName, role, email, password } = req.body;
    const passowrdHashed = await bcrypt.hash(password, 10);
    try {
      // if user already exist
      const exitsteduser = await User.findOne({ email });
      if (exitsteduser) {
        console.log("User already exist");
        return res
          .status(400)
          .json({ message: "User already exist", Status: 400 });
      } else {
        // create a new user
        const user = new User({
          firstName,
          lastName,
          role,
          email,
          password: passowrdHashed,
        });
        const savedUser = await user.save();
        res.status(200).json({
          message: "User Signup successfully",
          savedUser,
          status: 200,
        });
        console.log("User saved successfully", savedUser);
      }
    } catch (error) {
      console.log("Error in saving user in database", error);
    }
  } catch (error) {
    console.log("Error to fetch data from front end", error);
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

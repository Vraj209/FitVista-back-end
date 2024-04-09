import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { getResetPasswordToken } from "../models/user.model.js";
import dotenv from "dotenv";
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
    try {
      const user = await User.findOne({ email });
      if (user) {
      
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          console.log("Password not match");
          res.status(400).json({ message: "Password not match", Status: 400 });
        } else {
          const token = jwt.sign(
            { userId: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
          );

          const response = new ApiResponse(
            200,
            "User signin successfully",
            user,
            token
          );
          const options = {
            httpOnly: true,
            
          };
          res.cookie("token", token, options);
          return res.json(response);
        }
      } else {
        console.log("User not exist");
        res.status(400).json({ message: "User not exist", Status: 400 });
      }
    } catch (error) {
      console.log("Error in signin", error);
    }
  } catch (error) {
    console.log("Error to fetch data from front end in signin", error);
    res.status(500).json({ message: error, Status: 500 });
  }
});

// change password
const changePassword = asyncHandler(async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          console.log("Old password not match");
          res
            .status(400)
            .json({ message: "Old password not match", Status: 400 });
        } else {
          const passowrdHashed = await bcrypt.hash(newPassword, 10);
          user.password = passowrdHashed;
          const updatedUser = await user.save();
          res.status(200).json({
            message: "Password changed successfully",
            updatedUser,
            status: 200,
          });
          console.log("Password changed successfully", updatedUser);
        }
      } else {
        console.log("User not exist");
        res.status(400).json({ message: "User not exist", Status: 400 });
      }
    } catch (error) {
      console.log("Error in changing password", error);
    }
  } catch (error) {
    console.log("Error to fetch data from front end in change password", error);
    res.status(500).json({ message: error, Status: 500 });
  }
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not exist", Status: 400 });
      } else {
        const resetToken = await User.getResetPasswordToken();
        const url = `${process.env.FRONT_END_URL}/forgotPassword/${resetToken}`;
        const message = `Click on the link to reset your password ${url} . If you didn't request this, please ignore this email.`;
        await sendEmail(user.email, "Reset Password", message);
      }
    } catch (error) {
      console.log("Error in forgot password", error);
    }
  } catch (error) {
    console.log("Error to fetch data from front end in forgot password", error);
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

// Active User
const activeUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      const numberOfActiveUser = users.filter((user) => {
        return user.status === "active";
      }).length;
      res.send(200).json({ numberOfActiveUser, status: 200 });
    } else {
      res.send(404).json({ message: "Users not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, status: 500 });
  }
});

// Total User
const totalUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json({ users, status: 200 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, Status: 500 });
  }
});

// get single user
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        res.status(200).json({ user, status: 200 });
      } else {
        res.status(404).json({ message: "User not found", status: 404 });
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

const assignTrainer = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const { trainer } = req.body;
    console.log(trainer);
    const user = await User.findById(userId);
    if (user) {
      user.trainer = trainer;
      const updatedTrainer = await user.save();
      console.log("Trainer Assigned  successfully");
      console.log(user.trainer);
      res.status(200).json({
        message: "Trainer Assigned  successfully",
        updatedTrainer,
        status: 200,
      });
    } else {
      res.status(404).json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log("Error in Assigning trainer", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

const currentUser = asyncHandler(async (req, res) =>
{
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({ user, status: 200 });
    } else {
      res.status(404).json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log("Error in getting current user", error);
    res.status(500).json({ message: error, status: 500 });
  }
}
);

export {
  signup,
  signin,
  logout,
  changePassword,
  forgotPassword,
  activeUser,
  totalUser,
  getUser,
  assignTrainer,
  currentUser,
};

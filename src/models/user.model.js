import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      requied: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    weight: {
      type: Number,
      // required: true,
    },
    height: {
      type: Number,
      // required: true,
    },
    goals: {
      type: [String],
    },
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },
    trainer: {
      type: String,
      // required: true,
    },
    client: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], // Enumerate possible values
      default: 'active', // Set default value
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

export const User = mongoose.model("User", userSchema);

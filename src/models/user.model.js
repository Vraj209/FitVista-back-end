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
      required: true,
      enum: ["trainer", "trainee", "admin"],
      default: "trainee",
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
      default: "none",
      // required: true,
    },
    client: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"], // Enumerate possible values
      default: "active", // Set default value
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE
  });
}


export const User = mongoose.model("User", userSchema);

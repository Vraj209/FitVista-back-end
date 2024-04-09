import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
const secret_key = process.env.JWT_SECRET_KEY;


// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decodedData = jwt.verify(token, secret_key);
  console.log("decodedData", decodedData);
  req.user = await User.findById(decodedData.id);
  next();
};

// Middleware to check if the user is authorized
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403)
      );
    }
    next();
  };
};



export { isAuthenticated, authorizeRoles };

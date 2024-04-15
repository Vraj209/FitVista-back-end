import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // Ensure you import cookie-parser if not done globally

dotenv.config();
const secret_key = process.env.JWT_SECRET_KEY;

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token;
  console.log("Token from cookies:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedData = await jwt.verify(token, secret_key);
    console.log("Decoded JWT data:", decodedData);

    req.user = await User.findById(decodedData.userId);
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Error in token verification:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check if the user is authorized
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role: ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
};

export { isAuthenticated, authorizeRoles };

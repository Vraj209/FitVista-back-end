import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const isAuthenticated = async (req, res, next) =>
{
  console.log("req.headers",req.headers);
  console.log("req.cookies",req.cookies);
  const token = req.cookies.token;
  console.log("token",token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const user = jwt.verify(token,"fitvista123");
    req.user = user;
    console.log("user",user);
    next();
  } catch (error) {
    console.log("Error in authentication", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export { isAuthenticated };

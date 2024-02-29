import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne(decoded?._id);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in authentication", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export { isAuthenticated };

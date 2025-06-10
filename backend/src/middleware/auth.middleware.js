import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorizd - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECET);
    if (!decoded) {
      return res.status(400).json({ message: "Unauthorizd - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

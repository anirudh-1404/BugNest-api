import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../modals/user.schema.js";
import { Issue } from "../modals/issue.schema.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id).select("-password");
    next();
  } catch (err) {
    res.status(500).json({
      message: "Unauthorized access",
    });
  }
};

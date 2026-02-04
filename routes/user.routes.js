import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controller.js";

const route = express.Router();

route.post("/signup", registerController);
route.post("/login", loginController);

export default route;

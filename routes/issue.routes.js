import express from "express";
import {
  createIssue,
  getAllIssues,
  getMyIssues,
  getSingleIssue,
} from "../controllers/issue.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", protectRoute, createIssue);
route.get("/myIssues", protectRoute, getMyIssues);
route.get("/allIssues", protectRoute, getAllIssues);
route.get("/issue/:id", protectRoute, getSingleIssue);

export default route;

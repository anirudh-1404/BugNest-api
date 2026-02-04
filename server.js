import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["get", "post", "put", "patch", "delete"],
    credentials: true,
  }),
);

app.use("/api/auth", userRoutes);

connectdb();

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

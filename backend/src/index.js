import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:/${PORT}`);
  connectDB();
});

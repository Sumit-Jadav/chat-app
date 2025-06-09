import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`database connection error: ${error}`);
  }
};

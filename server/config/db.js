import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASS
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;

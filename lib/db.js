import mongoose from 'mongoose';
import dotenv from "dotenv";
import  createDummyData  from './dummyData.js'; 

dotenv.config();


const MONGO_URI = process.env.MONGO_URI; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
    await createDummyData();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); 
  }
};

export default connectDB;
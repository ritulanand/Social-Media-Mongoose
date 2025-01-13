import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;
console.log("url", url);

export const connectDB = async ()=>{
    await mongoose.connect(url)
}
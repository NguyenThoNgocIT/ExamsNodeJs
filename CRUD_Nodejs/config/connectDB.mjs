// Kết nối MongoDB
import mongoose from "mongoose";
export const connectMongooseDB = async (uri)=>{
  try {
        mongoose.connect(uri)
  } catch (error) {
    console.log("Error 404 no connect DB")
  }
}
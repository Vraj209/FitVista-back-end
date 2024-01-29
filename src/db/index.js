import mongoose from "mongoose";
import { DB_NAME } from "../constants";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected :: Host ->  ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.error("MongoDB Connection :", error);
    process.exit(1);
  }
};

export default connectDB;

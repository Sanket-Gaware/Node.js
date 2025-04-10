import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export default ConnectToDb;

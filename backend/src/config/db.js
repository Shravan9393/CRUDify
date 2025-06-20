// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// import { DB_NAME } from "../constant.js";

// dotenv.config();

// const connectDB = async() =>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         console.log(
//           `\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
//         );      
//     } catch (error) {
//         console.error("MongoDB Connection Error :" , error.message);
//         process.exit(1);
//     }
// };



// export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constant.js";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `✅ MongoDB connected! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;

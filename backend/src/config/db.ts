import mongoose from 'mongoose';
import * as process from "node:process";
import {mongoUri} from "@/utils/constants";

// @todo
//    全部换成常量
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
};
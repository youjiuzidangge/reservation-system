import mongoose from 'mongoose';

// @todo
//    全部换成常量
export const connectDB = async () => {
  try {
    console.log('process.env.MONGO_USER:', process.env.MONGO_USER);
    console.log('process.env.MONGO_PASSWORD:', process.env.MONGO_PASSWORD);
    console.log('process.env.MONGO_HOST:', process.env.MONGO_HOST);
    console.log('process.env.MONGO_PORT:', process.env.MONGO_PORT);
    console.log('process.env.MONGO_DB:', process.env.MONGO_DB);
    await mongoose.connect('mongodb://127.0.0.1:27017/hilton', {
      user: process.env.MONGO_USER,         // 如果设置了认证
      pass: process.env.MONGO_PASSWORD,     // 如果设置了认证
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any); // 如果 TS 报错可以临时用 any
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
};
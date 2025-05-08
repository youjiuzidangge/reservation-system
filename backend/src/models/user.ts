import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'guest' | 'employee';
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'employee'], required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
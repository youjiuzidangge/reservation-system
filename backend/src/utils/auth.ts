import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import logger from './logger';

export function generateToken(
  userId: string, 
  role: string, 
  secret: string = process.env.APP_SECRET || 'your-secret-key'
): string {
  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn: '1h' }
  );
}

export const hashPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        logger.error('Error hashing password:', error);
        throw new Error('Password hashing error');
    }
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        logger.error('Error comparing password:', error);
        throw new Error('Password comparison error');
    }
};

export const verifyToken = (token: string, secret: string) => {
    try {
        return jwt.verify(token, secret) as { userId: string; role: string };
    } catch (error) {
        logger.error('Error verifying token:', error);
        throw new Error('Invalid token');
    }
};
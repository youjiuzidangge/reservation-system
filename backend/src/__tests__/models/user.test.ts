import mongoose from 'mongoose';
import { User } from '@/models/user';

describe('User Model Test', () => {
  it('should create & save user successfully', async () => {
    const validUser = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'guest'
    };
    
    const savedUser = await User.create(validUser);
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.phone).toBe(validUser.phone);
    expect(savedUser.role).toBe(validUser.role);
  });

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'John Doe' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
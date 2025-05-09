import request from 'supertest';
import { createServer } from '@/server';
import { User } from '@/models/user';

const { httpServer } = createServer();

it('should register user', async () => {
  const res = await request(httpServer)
    .post('/auth/signup')
    .send({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
      phone: '13800138000',
      role: 'guest'
    });
  expect(res.status).toBe(201);
});

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /auth/signup', () => {
    it('should register a new user', async () => {
      const res = await request(httpServer)
        .post('/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          phone: '13800138000',  // 新增phone字段
          role: 'guest'          // 新增role字段
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('POST /auth/login', () => {
    it('should login existing user', async () => {
      // 先确保用户已注册
      await request(httpServer)
        .post('/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          phone: '13800138000',
          role: 'guest'
        });
      
      const res = await request(httpServer)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });
  });
});
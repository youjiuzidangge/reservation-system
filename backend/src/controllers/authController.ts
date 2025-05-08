// import { Context } from 'koa';
// import { User } from '../models/user';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
//
// const JWT_SECRET = process.env.JWT_SECRET || 'hilton_secret';
//
// export default class AuthController {
//   static async register(ctx: Context) {
//     try {
//       const { username, email, password, role } = ctx.request.body;
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         ctx.status = 400;
//         ctx.body = { error: 'Email already exists' };
//         return;
//       }
//
//       const user = new User({ username, email, password, role });
//       await user.save();
//
//       ctx.status = 201;
//       ctx.body = { message: 'User created successfully' };
//     } catch (error) {
//       ctx.status = 500;
//       ctx.body = { error: 'Registration failed' };
//     }
//   }
//
//   static async login(ctx: Context) {
//     try {
//       const { email, password } = ctx.request.body;
//       const user = await User.findOne({ email });
//
//       if (!user || !(await user.comparePassword(password))) {
//         ctx.status = 401;
//         ctx.body = { error: 'Invalid credentials' };
//         return;
//       }
//
//       const token = jwt.sign(
//         { id: user.id, role: user.role },
//         JWT_SECRET,
//         { expiresIn: '1h' }
//       );
//
//       ctx.body = { token };
//     } catch (error) {
//       ctx.status = 500;
//       ctx.body = { error: 'Login failed' };
//     }
//   }
// }
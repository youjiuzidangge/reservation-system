import {Context, Next} from 'koa';
import jwt from 'jsonwebtoken';
import {User} from '@/models/user';

export default function auth(role?: 'guest' | 'employee') {
  return async (ctx: Context, next: Next) => {
    const token = ctx.headers.authorization?.split(' ')[1];
    // 如果是开发环境，跳过认证
    if (!token && process.env.NODE_ENV !== 'production') {
      ctx.state.user = await User.findOne({email: 'john@example.com'});
      return await next();
    }

    if (!token) {
      ctx.throw(401, 'Authentication required');
    }

    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET || 'your-secret-key') as { userId: string };
      const user = await User.findById(decoded.userId);
      if (!user || (role && user.role !== role)) {
        ctx.throw(403, 'Forbidden');
      }
      ctx.state.user = user;
      await next();
    } catch (err) {
      ctx.throw(401, 'Invalid token');
    }
  };
}
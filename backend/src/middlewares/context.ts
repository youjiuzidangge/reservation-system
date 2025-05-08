import { Context, Next } from 'koa';
import { closeDB } from '@/config/db';

export default function contextMiddleware() {
  return async (ctx: Context, next: Next) => {
    ctx.state = {
      ...ctx.state,
      token: ctx.headers.token,
      db: { close: closeDB }
    };
    await next();
  };
}
import { Context, Next } from 'koa';
import logger from '../utils/logger';

export default async function requestLogger(ctx: Context, next: Next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`, {
    method: ctx.method,
    url: ctx.url,
    status: ctx.status,
    responseTime: `${ms}ms`,
    userAgent: ctx.headers['user-agent']
  });
}
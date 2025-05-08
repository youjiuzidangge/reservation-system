import { Context, Next } from 'koa';
import logger from '@/utils/logger';

export default async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: {
        message: err.message,
        code: err.code || 'INTERNAL_SERVER_ERROR'
      }
    };
    logger.error(`Error occurred: ${err.message}`, { stack: err.stack });
  }
}
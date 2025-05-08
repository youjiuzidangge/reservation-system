import Koa from 'koa';
import Router from '@koa/router';
import { auth } from '@/middlewares';

export function configureRoutes(app: Koa) {
  const router = new Router();

  // 健康检查路由
  router.get('/health', (ctx) => {
    ctx.body = { status: 'ok' };
  });

  // 添加认证路由
  router.use('/auth', auth());

  app.use(router.routes());
  app.use(router.allowedMethods());
}
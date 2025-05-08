import Koa from 'koa';
import Router from '@koa/router';
import authRouter from '@/routes/auth';
import { auth } from '@/middlewares';

export function configureRoutes(app: Koa) {
  const router = new Router();

  // 健康检查路由
  router.get('/health', (ctx) => {
    ctx.body = { status: 'ok' };
  });

  app.use(authRouter.routes())
  app.use(authRouter.allowedMethods());

  app.use(auth());
  app.use(router.routes());
  app.use(router.allowedMethods());
}
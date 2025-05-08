import Koa from 'koa';
import http from 'http';
import { configureMiddlewares } from '@/config/middlewares';
import { configureRoutes } from '@/config/routes';
import { auth } from '@/middlewares';

export function createServer() {
  const app = new Koa();
  
  // 应用认证中间件
  app.use(auth());
  
  const httpServer = http.createServer(app.callback());

  // 配置中间件
  configureMiddlewares(app);

  // 配置路由
  configureRoutes(app);

  return {
    app,
    httpServer
  };
}
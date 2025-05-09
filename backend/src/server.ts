import Koa from 'koa';
import http from 'http';
import { configureMiddlewares } from '@/config/middlewares';
import { configureRoutes } from '@/config/routes';
import { startApolloServer } from '@/config/apollo';

export function createServer() {
  const app = new Koa();
  
  const httpServer = http.createServer(app.callback());
  startApolloServer(app, httpServer);

  configureMiddlewares(app);
  configureRoutes(app);

  return {
    app,
    httpServer
  };
}
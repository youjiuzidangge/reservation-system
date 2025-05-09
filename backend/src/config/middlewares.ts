import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { errorHandler, requestLogger } from '@/middlewares';

export function configureMiddlewares(app: Koa) {
  app.use(cors());
  app.use(bodyParser());
  app.use(errorHandler);
  app.use(requestLogger);
}
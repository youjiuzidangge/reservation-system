import { Context, Next } from 'koa';
import Joi from 'joi';

export function validate(schema: Joi.ObjectSchema) {
  return async (ctx: Context, next: Next) => {
    const { error } = schema.validate(ctx.request.body);
    if (error) {
      ctx.throw(400, error.details[0].message);
    }
    await next();
  };
}
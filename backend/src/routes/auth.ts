import Router from 'koa-router';
import { signup, login, logout } from '@/controllers/authController';
import { validate } from '@/middlewares/validator';
import Joi from 'joi';
import { LoginBody, SignupBody } from '@/types';

const router = new Router({ prefix: '/auth' });

const signupSchema = Joi.object<SignupBody>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    role: Joi.string().valid('guest', 'employee').required()
});

const loginSchema = Joi.object<LoginBody>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

export default router;
import { Context } from 'koa';
import { User } from '@/models/user';
import { comparePassword, generateToken, hashPassword } from '@/utils/auth';
import logger from '@/utils/logger';
import { LoginBody, SignupBody } from '@/types';

export const signup = async (ctx: Context) => {
    const { email, name, password, role } = ctx.request.body as SignupBody;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`Signup failed: Email ${email} already exists`);
            ctx.throw(400, 'Email already exists');
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ email, name, password: hashedPassword, role });
        await user.save();

        const token = generateToken(user.id.toString(), user.role);
        ctx.body = {
            token,
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            },
        };
        ctx.status = 201;
        logger.info(`User signed up: ${email}`);
    } catch (error: any) {
        logger.error('Signup error:', error);
        ctx.throw(500, 'Signup failed');
    }
};

export const login = async (ctx: Context) => {
    const { email, password } = ctx.request.body as LoginBody;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`Login failed: No user with email ${email}`);
            ctx.throw(401, 'Invalid credentials');
        }

        const valid = await comparePassword(password, user.password);
        if (!valid) {
            logger.warn(`Login failed: Invalid password for ${email}`);
            ctx.throw(401, 'Invalid credentials');
        }

        const token = generateToken(user.id.toString(), user.role);
        ctx.body = {
            token,
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            },
        };
        ctx.status = 200;
        logger.info(`User logged in: ${email}`);
    } catch (error: any) {
        logger.error('Login error:', error);
        ctx.throw(500, 'Login failed');
    }
};

export const logout = async (ctx: Context) => {
    try {
        ctx.status = 200;
        ctx.body = { message: 'Logged out successfully' };
        logger.info(`User logged out successfully`);
    } catch (error: any) {
        logger.error('Logout error:', error);
        ctx.throw(500, 'Logout failed');
    }
};
import { Request, Response } from 'express';
import { z } from 'zod';
import { hashPassword, comparePassword } from '../helpers/encrypt';
import userService from '../services/userService';
import { signToken } from '../helpers/jwt';

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

type UserSignUpRequest = z.infer<typeof signUpSchema>;
type UserSignInRequest = z.infer<typeof signInSchema>;

export const signIn = async (
  req: Request<{}, {}, UserSignInRequest>,
  res: Response
) => {
  try {
    const input = signInSchema.safeParse(req.body);

    if (!input.success) {
      return res.status(400).json({
        message: input.error.format(),
      });
    }

    const user = await userService.getUserByEmail(input.data.email);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const isPasswordMatch = comparePassword(input.data.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const token = signToken({ email: user.email, name: user.name });

    res.json({
      status: 'success',
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

export const signUp = async (
  req: Request<{}, {}, UserSignUpRequest>,
  res: Response
) => {
  try {
    const user = signUpSchema.safeParse(req.body);

    if (user.success === false) {
      return res.status(400).json({
        message: 'Bad request',
      });
    }

    const checkUser = await userService.getUserByEmail(user.data.email);

    if (checkUser) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'User already exist',
      });
    }

    const hashedPassword = hashPassword(user.data.password);
    await userService.createUser({ ...user.data, password: hashedPassword });

    const token = signToken({ email: user.data.email, name: user.data.name });

    res.json({
      status: 'success',
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

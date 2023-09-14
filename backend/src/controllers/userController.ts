import { Request, Response } from "express";
import { z } from "zod";
import { hashPassword } from "../helpers/encrypt";
import userService from "../services/userService";
import { signToken } from "../helpers/jwt";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

type UserSignUpRequest = z.infer<typeof userSchema>;

export const signIn = (req: Request, res: Response) => {
  res.json({
    message: "success",
  });
};

export const signUp = async (
  req: Request<{}, {}, UserSignUpRequest>,
  res: Response
) => {
  try {
    const user = userSchema.parse(req.body);

    const checkUser = await userService.getUserByEmail(user.email);

    if (checkUser) {
      return res.status(400).json({
        status: "Bad request",
        message: "User already exist",
      });
    }

    const hashedPassword = hashPassword(user.password);
    await userService.createUser({ ...user, password: hashedPassword });

    const token = signToken({ email: user.email, name: user.name });

    res.json({
      status: "success",
      message: "Sucessfully sign up",
      token: "Bearer " + token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

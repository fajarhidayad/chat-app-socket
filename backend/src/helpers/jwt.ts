import jwt from 'jsonwebtoken';

export const signToken = (payload: object): string => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

  const oneDay = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  const token = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: oneDay,
  });
  return token;
};

export const verifyToken = (token: string) => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

  const validate = jwt.verify(token, PRIVATE_KEY);
  return validate;
};

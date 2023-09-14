import type { Request, Response, NextFunction } from "express";
import CustomError from "../helpers/CustomError";

interface ErrorHandlerType extends Error {
  statusCode?: number;
  status?: string;
}

export const errorNotFound = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const errorHandler = (
  err: ErrorHandlerType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status;

  if (err.statusCode === 404) next();

  res.status(statusCode).json({ status, message: err.message });
};

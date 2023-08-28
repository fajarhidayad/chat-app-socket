import type { Request, Response, NextFunction } from "express";

export const errorNotFound = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    status: "NOT_FOUND",
    message: "Route not found",
  });
};

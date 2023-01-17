import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  statusCode: number;
  constructor(statusCode = 400, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.message.includes("invalid input syntax")) {
    return res.status(404).json({ message: "Invalid syntax" });
  }

  if (err.message.includes("must be a valid UUID")) {
    return res.status(400).json({ message: "Invalid UUID" });
  }

  console.log(err.message);

  return res.status(500).json({ message: "Internal server error" });
};

export { AppError, errorHandler };

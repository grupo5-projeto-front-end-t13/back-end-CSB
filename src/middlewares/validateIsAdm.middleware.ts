import { NextFunction, Request, Response } from "express";

export const validateIsAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user.isAdm)
    return res.status(403).json({
      message: "Unauthorized",
    });

  return next();
};

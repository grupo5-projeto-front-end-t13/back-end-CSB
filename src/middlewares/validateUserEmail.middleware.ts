import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";

export const validateUserEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id;

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser?.verified)
    return res.status(401).json({ message: "User is not verified" });

  return next();
};

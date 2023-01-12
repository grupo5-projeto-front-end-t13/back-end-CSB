import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export const validateIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.params.id;
  const user = await userRepository.findOneBy({ id: id });

  if (!user) return res.status(404).json({ message: "Invalid Id" });

  return next();
};

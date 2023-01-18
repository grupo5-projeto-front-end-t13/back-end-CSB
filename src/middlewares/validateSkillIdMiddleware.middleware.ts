import { NextFunction, Request, Response } from "express";
import { skillRepository } from "../repositories/skillRepository";

export const validateSkillIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.params.id;

  const skill = await skillRepository.findOneBy({ id });

  if (!skill) return res.status(404).json({ message: "Can not find Skill" });

  return next();
};

import { Request, Response } from "express";
import { createSkillsService } from "../../services/skills/createSkill.service";

export const createSkillsController = async (req: Request, res: Response) => {
  const name = req.body.name;

  const data = await createSkillsService(name);

  return res.status(201).json(data);
};

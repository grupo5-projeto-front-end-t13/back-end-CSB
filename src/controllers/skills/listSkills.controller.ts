import { Request, Response } from "express";
import { listSkillsService } from "../../services/skills/listSkills.service";

export const listSkillsController = async (req: Request, res: Response) => {
  const data = await listSkillsService();

  return res.status(200).json(data);
};

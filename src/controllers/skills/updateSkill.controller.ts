import { Request, Response } from "express";
import { updateSkillService } from "../../services/skills/updateSkill.service";

export const updateSkillController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = req.body.name;

  const data = await updateSkillService(id, name);

  return res.status(200).json(data);
};

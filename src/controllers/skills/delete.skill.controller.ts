import { Request, Response } from "express";
import { deleteSkillsService } from "../../services/skills/delete.service";

export const deleteSkillController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await deleteSkillsService(id);

  return res.status(204).json(data);
};

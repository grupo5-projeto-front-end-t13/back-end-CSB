import { Request, Response } from "express";

export const listSkillsController = async(req: Request, res: Response) => {
  const listSkills = await listSkillsService()
  return res.status(200).json(listSkills)
}
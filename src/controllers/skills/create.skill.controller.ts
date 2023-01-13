import { Request, Response } from "express";
import { createSkillsService } from "../../services/skills/create.service";

export const createSkillsController = async(req: Request, res: Response) =>{
  const bodyName = req.body.name
  const skill = await createSkillsService(bodyName)
  return res.status(201).json(skill)
}
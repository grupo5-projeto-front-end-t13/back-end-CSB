import { Router } from "express";
import { listSkillsController } from "../controllers/skills/list.skill.controller";

export const skillsRoutes = Router()

skillsRoutes.get('/', listSkillsController)
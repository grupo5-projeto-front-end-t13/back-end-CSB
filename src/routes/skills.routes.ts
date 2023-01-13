import { Router } from "express";
import { createSkillsController } from "../controllers/skills/create.skill.controller";
import { listSkillsController } from "../controllers/skills/list.skill.controller";

export const skillsRoutes = Router()

skillsRoutes.get('/', listSkillsController)

skillsRoutes.post('/', createSkillsController)
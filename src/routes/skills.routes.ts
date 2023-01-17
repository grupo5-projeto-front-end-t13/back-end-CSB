import { Router } from "express";
import { createSkillsController } from "../controllers/skills/createSkill.controller";
import { deleteSkillController } from "../controllers/skills/deleteSkill.controller";
import { listSkillsController } from "../controllers/skills/listSkills.controller";
import { validateAuthTokenMiddleware } from "../middlewares/validateAuthToken.middleware";
import { validateSkillIdMiddleware } from "../middlewares/validateSkillIdMiddleware.middleware";
import { validateIsAdm } from "../middlewares/validateIsAdm.middleware";

export const skillsRoutes = Router();

skillsRoutes.get("", listSkillsController);
skillsRoutes.post(
  "/",
  validateAuthTokenMiddleware,
  validateIsAdm,
  createSkillsController
);
skillsRoutes.delete(
  "/:id",
  validateAuthTokenMiddleware,
  validateIsAdm,
  validateSkillIdMiddleware,
  deleteSkillController
);

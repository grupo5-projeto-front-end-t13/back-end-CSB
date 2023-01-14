import { Router } from "express";
import { createSkillsController } from "../controllers/skills/create.skill.controller";
import { deleteSkillController } from "../controllers/skills/delete.skill.controller";
import { listSkillsController } from "../controllers/skills/list.skill.controller";
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

import { Router } from "express";
import { createUsersController } from "../controllers/user/userCreate.controller";
import { validateDataMiddleware } from "../middlewares/validateSerializer.middleware";
import { createUserSerializer } from "../serializers/user/user.serializers";

export const userRoutes = Router();

userRoutes.post(
  "",
  validateDataMiddleware(createUserSerializer),
  createUsersController
);

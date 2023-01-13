import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";
import { loginMiddleware } from "../middlewares/validateLogin.middleware";
import { validateDataMiddleware } from "../middlewares/validateSerializer.middleware";
import { loginSerializer } from "../serializers/login/login.serializers";

export const loginRoutes = Router();

loginRoutes.post(
  "",
  validateDataMiddleware(loginSerializer),
  loginMiddleware,
  loginController
);

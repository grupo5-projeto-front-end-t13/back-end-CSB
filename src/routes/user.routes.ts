import { Router } from "express";
import { deleteController } from "../controllers/user/userDelete.controller";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";

export const userRoutes = Router();

userRoutes.post("");

userRoutes.delete(':id', validateIdMiddleware, deleteController)
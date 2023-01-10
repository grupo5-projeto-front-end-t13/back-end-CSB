import { Router } from "express";
import { bandListIdController } from "../controllers/band/bandListId.controller";

export const bandRoutes = Router();

bandRoutes.post("");




bandRoutes.get("/:id",bandListIdController);
import { Router } from "express";
import { bandUpdateIdController } from "../controllers/band/bandUpdateId.controller";

export const bandRoutes = Router();

bandRoutes.post("");
bandRoutes.patch("/:id",bandUpdateIdController)
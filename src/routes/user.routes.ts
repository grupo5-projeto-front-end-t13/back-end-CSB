import { Router } from "express";
import { listBandsController } from "../controllers/band/listBands.controller";

export const userRoutes = Router();

userRoutes.post("");
userRoutes.get("/band", listBandsController)
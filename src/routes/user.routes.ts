import { Router } from "express";
import { listMusiciansController } from "../controllers/user/listMusicians.controller";

export const userRoutes = Router();

userRoutes.get("/musician", listMusiciansController);

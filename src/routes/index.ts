import { Router } from "express";
import { userRoutes } from "./user.routes";

export const globalRoutes = Router();

globalRoutes.use("/user", userRoutes);

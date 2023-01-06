import { Router } from "express";
import { bandRoutes } from "./band.routes";
import { userRoutes } from "./user.routes";

export const globalRoutes = Router();

globalRoutes.use("/user", userRoutes);
globalRoutes.use("/band", bandRoutes);
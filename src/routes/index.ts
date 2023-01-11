import { Router } from "express";
import { bandRoutes } from "./band.routes";
import { userRoutes } from "./user.routes";

export const globalRoutes = Router();

globalRoutes.use("/users", userRoutes);
globalRoutes.use("/band", bandRoutes);

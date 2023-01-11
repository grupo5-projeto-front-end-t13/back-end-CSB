import { Router } from "express";
import { loginRoutes } from "./login.routes";
import { userRoutes } from "./user.routes";

export const globalRoutes = Router();

globalRoutes.use("/users", userRoutes);
globalRoutes.use("/login", loginRoutes);

import { Router } from "express";
import { invitesRoutes } from "./invites.routes";
import { loginRoutes } from "./login.routes";
import { skillsRoutes } from "./skills.routes";
import { userRoutes } from "./user.routes";

export const globalRoutes = Router();

globalRoutes.use("/users", userRoutes);
globalRoutes.use("/invites", invitesRoutes);
globalRoutes.use("/login", loginRoutes);
globalRoutes.use("/skills", skillsRoutes);

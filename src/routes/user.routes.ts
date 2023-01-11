import { Router } from "express";
import { listBandsController } from "../controllers/band/listBands.controller";
import { listMusiciansController } from "../controllers/user/listMusicians.controller";

export const userRoutes = Router();

userRoutes.post("");
userRoutes.get("/band", listBandsController)
userRoutes.get("/musician", listMusiciansController);
userRoutes.post('/invites', createInviteController)

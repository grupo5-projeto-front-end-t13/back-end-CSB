import { Router } from "express";
import { deleteInviteController } from "../controllers/user/deleteInviteController";
import { listUserReceivedInvitesController } from "../controllers/user/listUserReceivedInvites.controller";
import { listUserSendedInvitesController } from "../controllers/user/listUserSendedInvites.controller";
import { createUserInviteController } from "../controllers/user/userCreateInvite.controller";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import { validateInviteIdMiddleware } from "../middlewares/validateInviteId.middleware";

export const invitesRoutes = Router();

invitesRoutes.get(
  "/received/:id",
  validateIdMiddleware,
  listUserReceivedInvitesController
);
invitesRoutes.get(
  "/sended/:id",
  validateIdMiddleware,
  listUserSendedInvitesController
);
invitesRoutes.post("", createUserInviteController);
invitesRoutes.delete(
  "/:id",
  validateInviteIdMiddleware,
  deleteInviteController
);

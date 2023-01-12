import { Router } from "express";
import { deleteInviteController } from "../controllers/invites/deleteInviteController";
import { listUserReceivedInvitesController } from "../controllers/invites/listUserReceivedInvites.controller";
import { listUserSendedInvitesController } from "../controllers/invites/listUserSendedInvites.controller";
import { createUserInviteController } from "../controllers/invites/userCreateInvite.controller";
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

import { Router } from "express";
import { deleteInviteController } from "../controllers/invites/deleteInviteController";
import { listUserReceivedInvitesController } from "../controllers/invites/listUserReceivedInvites.controller";
import { listUserSendedInvitesController } from "../controllers/invites/listUserSendedInvites.controller";
import { createUserInviteController } from "../controllers/invites/userCreateInvite.controller";
import { validateAuthTokenMiddleware } from "../middlewares/validateAuthToken.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import { validateInviteIdMiddleware } from "../middlewares/validateInviteId.middleware";
import { validateDeleteInvitesPermissionMiddleware } from "../middlewares/validateDeleteInvitesPermission.middleware";
import { validateUserEmailMiddleware } from "../middlewares/validateUserEmail.middleware";

export const invitesRoutes = Router();

invitesRoutes.get(
  "/received/:id",
  validateAuthTokenMiddleware,
  validateIdMiddleware,
  listUserReceivedInvitesController
);
invitesRoutes.get(
  "/sended/:id",
  validateAuthTokenMiddleware,
  validateIdMiddleware,
  listUserSendedInvitesController
);
invitesRoutes.post(
  "",
  validateAuthTokenMiddleware,
  validateUserEmailMiddleware,
  createUserInviteController
);
invitesRoutes.delete(
  "/:id",
  validateAuthTokenMiddleware,
  validateInviteIdMiddleware,
  validateDeleteInvitesPermissionMiddleware,
  deleteInviteController
);

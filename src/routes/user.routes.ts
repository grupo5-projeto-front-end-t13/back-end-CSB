import { Router } from "express";
import { createUsersController } from "../controllers/user/userCreate.controller";
import { validateDataMiddleware } from "../middlewares/validateSerializer.middleware";
import { createUserSerializer } from "../serializers/user/user.serializers";
import { listBandsController } from "../controllers/band/listBands.controller";
import { listMusiciansController } from "../controllers/user/listMusicians.controller";
import { createUserInviteController } from "../controllers/user/userCreateInvite.controller";
import { deleteController } from "../controllers/user/userDelete.controller";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import { listUserReceivedInvitesController } from "../controllers/user/listUserReceivedInvites.controller";
import { listUserSendedInvitesController } from "../controllers/user/listUserSendedInvites.controller";

export const userRoutes = Router();

userRoutes.post(
  "",
  validateDataMiddleware(createUserSerializer),
  createUsersController
);
userRoutes.get("/band", listBandsController);
userRoutes.get("/musician", listMusiciansController);
userRoutes.get(
  "invites/received/:id",
  validateIdMiddleware,
  listUserReceivedInvitesController
);
userRoutes.get(
  "invites/sended/:id",
  validateIdMiddleware,
  listUserSendedInvitesController
);
userRoutes.post("/invites", createUserInviteController);
userRoutes.delete("/:id", deleteController);

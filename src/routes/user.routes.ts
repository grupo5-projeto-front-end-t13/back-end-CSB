import { Router } from "express";
import { createUsersController } from "../controllers/user/userCreate.controller";
import { validateDataMiddleware } from "../middlewares/validateSerializer.middleware";
import {
  createUserSerializer,
  updateUserSerializer,
} from "../serializers/user/user.serializers";
import { listBandsController } from "../controllers/user/listBands.controller";
import { deleteController } from "../controllers/user/userDelete.controller";
import { userUpdateController } from "../controllers/user/userUpdate.controller";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import { listAllUsersController } from "../controllers/user/listAllUsers.controller";
import { listMusiciansController } from "../controllers/user/listMusicians.controller";
import { validateAuthTokenMiddleware } from "../middlewares/validateAuthToken.middleware";
import { validateIsAdm } from "../middlewares/validateIsAdm.middleware";
import { validateUserPermissionMiddleware } from "../middlewares/validateUserPermission.middleware";

export const userRoutes = Router();

userRoutes.post(
  "",
  validateDataMiddleware(createUserSerializer),
  createUsersController
);
userRoutes.get("/band", validateAuthTokenMiddleware, listBandsController);
userRoutes.get("/musician", validateAuthTokenMiddleware, listMusiciansController);
userRoutes.get("", validateAuthTokenMiddleware, validateIsAdm, listAllUsersController);
userRoutes.patch(
  "/:id", validateAuthTokenMiddleware,
  validateDataMiddleware(updateUserSerializer),
  validateIdMiddleware,
  validateUserPermissionMiddleware,
  userUpdateController
);
userRoutes.delete("/:id", validateAuthTokenMiddleware, validateIdMiddleware, validateUserPermissionMiddleware, deleteController);

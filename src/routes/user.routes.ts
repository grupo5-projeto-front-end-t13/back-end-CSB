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

export const userRoutes = Router();

userRoutes.post(
  "",
  validateDataMiddleware(createUserSerializer),
  createUsersController
);
userRoutes.get("/band", listBandsController);
userRoutes.get("/musician", listMusiciansController);
userRoutes.get("", listAllUsersController);
userRoutes.patch(
  "/:id",
  validateDataMiddleware(updateUserSerializer),
  validateIdMiddleware,
  userUpdateController
);
userRoutes.delete("/:id", validateIdMiddleware, deleteController);

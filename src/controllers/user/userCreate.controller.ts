import { Response, Request } from "express";
import { iUserRequest } from "../../interfaces/user.interfaces";
import { createUsersService } from "../../services/user/userCreate.service";

export const createUsersController = async (req: Request, res: Response) => {
  const userData: iUserRequest = req.body;
  const newUser = await createUsersService(userData);
  return res.status(201).json(newUser);
};

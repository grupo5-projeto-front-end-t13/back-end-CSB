import { Request, Response } from "express";
import { listAllUsersService } from "../../services/user/listAllUsers.service";

export const listAllUsersController = async (req: Request, res: Response) => {
  const data = await listAllUsersService();

  return res.status(200).json(data);
};

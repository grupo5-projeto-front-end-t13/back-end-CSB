import { Request, Response } from "express";
import { userUpdateService } from "../../services/user/userUpdate.service";

export const userUpdateController = async (req: Request, res: Response) => {
  const user = req.body;
  const id = req.params.id;

  const data = await userUpdateService(user, id);

  return res.status(200).json(data);
};

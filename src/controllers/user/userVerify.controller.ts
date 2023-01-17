import { Request, Response } from "express";
import { userVerifyService } from "../../services/user/userVerify.service";

export const userVerifyController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await userVerifyService(id);

  return res.status(200).json(data);
};

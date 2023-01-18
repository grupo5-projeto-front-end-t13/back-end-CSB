import { Request, Response } from "express";
import { userResetPassService } from "../../services/user/userResetPass.service";

export const userResetPassController = async (req: Request, res: Response) => {
  const { password, code } = req.body;

  const data = await userResetPassService(password, code);

  return res.status(200).json(data);
};

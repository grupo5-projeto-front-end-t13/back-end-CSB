import { Request, Response } from "express";
import { loginService } from "../../services/login/login.service";

export const loginController = async (req: Request, res: Response) => {
  const email = req.body.email;

  const token = await loginService(email);

  return res.status(200).json(token);
};

import { Request, Response } from "express";
import { listBandsService } from "../../services/user/listBands.service";

export const listBandsController = async (req: Request, res: Response) => {
  const userType = req.user.type;

  const data = await listBandsService(userType);

  return res.status(200).json(data);
};

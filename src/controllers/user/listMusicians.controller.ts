import { Request, Response } from "express";
import { listMusiciansService } from "../../services/user/listMusicians.service";

export const listMusiciansController = async (req: Request, res: Response) => {
  const userType = req.user.type;
  const musicians = await listMusiciansService(userType);
  return res.status(200).json(musicians);
};

import { Request, Response } from "express";
import { listMusiciansService } from "../../services/user/listMusicians.service";


export const listMusiciansController = async (req: Request, res: Response) => {
  const musicians = await listMusiciansService();
  return res.status(200).json(musicians)
};

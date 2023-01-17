import { Request, Response } from "express";
import { deleteService } from "../../services/user/userDelete.service";

export const deleteController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await deleteService(id);

  return res.status(204).json(data);
};

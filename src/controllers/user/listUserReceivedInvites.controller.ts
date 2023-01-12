import { Request, Response } from "express";
import { listUserReceivedInvitesService } from "../../services/user/listUserReceivedInvites.service";

export const listUserReceivedInvitesController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;

  const data = await listUserReceivedInvitesService(userId);

  return res.status(200).json(data);
};

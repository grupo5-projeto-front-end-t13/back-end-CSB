import { Request, Response } from "express";
import { listUserSendedInvitesService } from "../../services/user/listUserSendedInvites.service";

export const listUserSendedInvitesController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;

  const data = await listUserSendedInvitesService(userId);

  return res.status(200).json(data);
};

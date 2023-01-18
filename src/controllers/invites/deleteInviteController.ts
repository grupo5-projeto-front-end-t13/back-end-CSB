import { Request, Response } from "express";
import { deleteInviteService } from "../../services/invites/inviteDelete.service";

export const deleteInviteController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  const data = await deleteInviteService(id, user);

  return res.status(204).json(data);
};

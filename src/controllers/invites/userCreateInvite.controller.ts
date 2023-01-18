import { Request, Response } from "express";
import { userCreateInviteService } from "../../services/invites/userCreateInvite.service";

export const createUserInviteController = async (
  req: Request,
  res: Response
) => {
  const idSend = req.body.userIdSend;
  const idReceive = req.body.userIdReceive;

  const data = await userCreateInviteService(idReceive,idSend);

  return res.status(201).json(data);
};

import { Request, Response } from "express";
import { userCreateInviteService } from "../../services/invites/userCreateInvite.service";

export const createUserInviteController = async (
  req: Request,
  res: Response
) => {
  const body = req.body;
  const invite = await userCreateInviteService(body);
  return res.status(201).json(invite);
};

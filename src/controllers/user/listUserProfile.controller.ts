import { Request, Response } from "express";
import { listUserProfilesService } from "../../services/user/listUserProfile.service";

export const listUserProfileController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;

  const data = await listUserProfilesService(userId);

  return res.status(200).json(data);
};

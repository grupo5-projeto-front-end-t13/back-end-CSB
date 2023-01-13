import { AppError } from "../../errors/errors";
import { iUser } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";

export const listUserProfilesService = async (id: string): Promise<iUser> => {
  const user = await userRepository.findOneBy({ id });

  if (!user) throw new AppError(404, "User not found");

  return user;
};

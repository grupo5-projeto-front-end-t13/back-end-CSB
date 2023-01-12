import { iUser } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";

export const listAllUsersService = async (): Promise<iUser[]> => {
  const users = userRepository.find();

  return users;
};

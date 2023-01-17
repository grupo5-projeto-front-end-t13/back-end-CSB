import { iUser } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { listUsers } from "../../serializers/user/user.serializers";

export const listAllUsersService = async (): Promise<iUser[]> => {
  const users = userRepository.find();

  const validatedUsers = await listUsers.validate(users, {
    stripUnknown: true,
  });

  return validatedUsers!;
};

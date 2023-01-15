import { AppError } from "../../errors/errors";
import {
  iUserCreateResponse,
  iUserRequest,
} from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { createUserResponseSerializer } from "../../serializers/user/user.serializers";

export const listUserProfilesService = async (
  id: string
): Promise<iUserCreateResponse> => {
  const user = await userRepository.findOneBy({ id });

  if (!user) throw new AppError(404, "User not found");

  const validatedUser = createUserResponseSerializer.validate(user, {
    stripUnknown: true,
  });

  return validatedUser;
};

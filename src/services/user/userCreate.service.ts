import {
  iUserRequest,
  iUserCreateResponse,
} from "../../interfaces/user.interfaces";
import { skillRepository } from "../../repositories/skillRepository";
import { userRepository } from "../../repositories/userRepository";
import { createUserResponseSerializer } from "../../serializers/user/user.serializers";

export const createUsersService = async (
  data: iUserRequest
): Promise<iUserCreateResponse> => {
  const findSkill = await skillRepository.findOneBy({
    id: data.skillsId,
  });
  const user = userRepository.create(data);
  await userRepository.save(user);

  const returnNewUser = await createUserResponseSerializer.validate(user, {
    stripUnknown: true,
  });
  return returnNewUser;
};

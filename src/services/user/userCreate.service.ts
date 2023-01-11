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
  console.log(data)
  const { skills, ...rest } = data;
  const findSkill = await skillRepository.findOneBy({
    id: data.skills.id,
  });

  const user = userRepository.create({
    ...rest,
    skills: {id: findSkill?.id},
  });

  await userRepository.save(user);

  const returnNewUser = await createUserResponseSerializer.validate(user, {
    stripUnknown: true,
  });

  return returnNewUser;
};

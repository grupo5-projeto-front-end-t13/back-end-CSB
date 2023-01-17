import { AppError } from "../../errors/errors";
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
  const { skills, isAdm, ...rest } = data;

  const findUser = await userRepository.findOneBy({ email: data.email });

  if (findUser) throw new AppError(409, "User already exists");

  const findSkill = await skillRepository.findOneBy({
    id: data.skills.id,
  });

  if (!findSkill && !isAdm) throw new AppError(404, "Skill does not exists");

  const user = userRepository.create({
    ...rest,
    skills: { id: findSkill?.id },
  });

  await userRepository.save(user);

  const returnNewUser = await createUserResponseSerializer.validate(user, {
    stripUnknown: true,
  });

  return returnNewUser;
};

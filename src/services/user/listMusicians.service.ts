import { AppError } from "../../errors/errors";
import { iUserMusician } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { listUserMusician } from "../../serializers/user/user.serializers";

export const listMusiciansService = async (
  userType: String
): Promise<iUserMusician[]> => {
  if (userType === "musician") {
    throw new AppError(401, "You cannot see users of the same type as you");
  }

  const musicians = await userRepository.find({
    relations: {
      skills: true,
    },
    where: {
      type: "musician",
    },
  });

  const filterMusicians = await listUserMusician.validate(musicians, {
    stripUnknown: true,
  });

  return filterMusicians!;
};

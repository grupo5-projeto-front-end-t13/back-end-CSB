import { AppError } from "../../errors/errors";
import { iUserBand } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { listUserBands } from "../../serializers/user/user.serializers";

export const listBandsService = async (
  userType: String
): Promise<iUserBand[]> => {
  if (userType === "band") {
    throw new AppError(401, "You cannot see users of the same type as you");
  }

  const bands = await userRepository.find({
    relations: {
      skills: true,
    },
    where: {
      type: "band",
    },
  });

  const bandResponse = await listUserBands.validate(bands, {
    stripUnknown: true,
  });

  return bandResponse!;
};

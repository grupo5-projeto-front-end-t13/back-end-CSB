import { iUserBand } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { listUserBands } from "../../serializers/user/user.serializers";

export const listBandsService = async (): Promise<iUserBand[]> => {

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

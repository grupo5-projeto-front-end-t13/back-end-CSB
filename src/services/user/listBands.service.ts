import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { iUserBand } from "../../interfaces/user.interfaces";
import { listUserBands } from "../../serializers/user/user.serializers";

export const listBandsService = async (): Promise<iUserBand[]> => {
  const bandRepository = AppDataSource.getRepository(User);

  const bands = await bandRepository.find({
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

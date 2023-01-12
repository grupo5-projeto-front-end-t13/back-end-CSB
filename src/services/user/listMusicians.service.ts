import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/errors";
import { iUserMusician } from "../../interfaces/user.interfaces";
import { listUserMusician } from "../../serializers/user/user.serializers";

export const listMusiciansService = async (): Promise<iUserMusician[]> => {
  const userRepository = AppDataSource.getRepository(User);

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

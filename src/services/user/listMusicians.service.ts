import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";

export const listMusiciansService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const musicians = await userRepository.findBy({
    type: "musician",
  });

  return musicians;
};

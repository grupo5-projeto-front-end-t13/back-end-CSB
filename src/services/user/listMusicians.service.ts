import { iUserMusician } from "../../interfaces/user.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { listUserMusician } from "../../serializers/user/user.serializers";

export const listMusiciansService = async (): Promise<iUserMusician[]> => {
  
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

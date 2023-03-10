import { userRepository } from "../../repositories/userRepository";

export const deleteService = async (id: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id });

  await userRepository.remove(user!);
};

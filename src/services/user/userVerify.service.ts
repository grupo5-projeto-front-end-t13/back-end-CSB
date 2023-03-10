import { AppError } from "../../errors/errors";
import { userRepository } from "../../repositories/userRepository";

export const userVerifyService = async (id: string) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "Could not verify user");
  }

  if (user.verified) return { message: "User successfully verified" };

  user.verified = true;

  await userRepository.save(user);

  return { message: "User successfully verified" };
};

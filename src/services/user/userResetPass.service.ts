import { hashSync } from "bcryptjs";
import { AppError } from "../../errors/errors";
import { userRepository } from "../../repositories/userRepository";

export const userResetPassService = async (password: string, code: string) => {
  const user = await userRepository.findOneBy({ id: code });

  if (!user) {
    throw new AppError(400, "Could not reset user password");
  }

  //   if (!user.verified) {
  //     return res.send("User is not verified");
  //   }

  user.password = hashSync(password, 10);

  await userRepository.save(user);

  return { message: "Successfully updated password" };
};

import jwt from "jsonwebtoken";
import { userRepository } from "../../repositories/userRepository";

export const loginService = async (email: string) => {
  const user = await userRepository.findOneBy({ email });

  const token = jwt.sign(
    {
      type: user?.type,
      isAdm: user?.isAdm,
    },
    process.env.SECRET_KEY!,
    { expiresIn: "24h", subject: user?.id }
  );

  return { token: token };
};

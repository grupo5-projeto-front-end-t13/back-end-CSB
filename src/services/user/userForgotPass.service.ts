import { AppError } from "../../errors/errors";
import { userRepository } from "../../repositories/userRepository";
import { sendEmail } from "../../utils/mailer";

export const userForgotPassService = async (email: string) => {
  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError(
      404,
      "If a user with that email is registered you will receive a password reset email"
    );
  }

  if (!user.verified) {
    throw new AppError(400, "User is not verified");
  }

  await sendEmail({
    from: "completesuabanda@gmail.com",
    to: user.email,
    subject: "Alteração de senha",
    text: `Código para alteração de senha: ${user.id}`,
  });

  return { message: "You will recieved a email with a code." };
};

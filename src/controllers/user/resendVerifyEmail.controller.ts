import { Response, Request } from "express";
import { iUser } from "../../interfaces/user.interfaces";
import { sendEmail } from "../../utils/mailer";
import { userRepository } from "../../repositories/userRepository";

export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const newUser: iUser | null  = await userRepository.findOneBy({id:id});

  if(!newUser){
    return res.status(400).json({message: "Invalid id"})
  };

  await sendEmail({
    from: "completesuabanda@gmail.com",
    to: newUser.email!,
    subject: "Bem vindo ao complete sua banda",
    text: `Faça a verificação do seu email clicando aqui: https://complete-sua-banda.onrender.com/users/verify/${newUser.id}`
  })
  return res.status(201).json({message: "Successfully Resend "});
};
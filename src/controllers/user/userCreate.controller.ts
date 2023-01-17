import { Response, Request } from "express";
import { iUserRequest } from "../../interfaces/user.interfaces";
import { createUsersService } from "../../services/user/userCreate.service";
import { sendEmail } from "../../utils/mailer";

export const createUsersController = async (req: Request, res: Response) => {
  const userData: iUserRequest = req.body;
  const newUser = await createUsersService(userData);
  await sendEmail({
    from: "completesuabanda@gmail.com",
    to: newUser.email,
    subject: "Bem vindo ao complete sua banda",
    text: `Faça a verificação do seu email clicando aqui: https://complete-sua-banda.onrender.com/users/verify/${newUser.id}`
  })
  return res.status(201).json(newUser);
};

import { Response, Request } from "express";
import { iUserRequest } from "../../interfaces/user.interfaces";
import { createUsersService } from "../../services/user/userCreate.service";
import { sendEmail } from "../../utils/mailer";

export const createUsersController = async (req: Request, res: Response) => {
  const user: iUserRequest = req.body;

  const data = await createUsersService(user);

  await sendEmail({
    from: "completesuabanda@gmail.com",
    to: data.email,
    subject: "Bem vindo ao complete sua banda",
    text: `Faça a verificação do seu email clicando aqui: https://complete-sua-banda.onrender.com/users/verify/${data.id}`,
  });

  return res.status(201).json(data);
};

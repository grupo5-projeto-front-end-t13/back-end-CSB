import { iInviteRequest } from "../../interfaces/invites.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { inviteRepository } from "../../repositories/inviteRepository";
import { returnInviteSerializer } from "../../serializers/invite/invite.serializers";
import { AppError } from "../../errors/errors";
import { sendEmail } from "../../utils/mailer";

export const userCreateInviteService = async (body: iInviteRequest) => {
  const idReceive = body.userIdReceive.id;
  const idSend = body.userIdSend.id;

  const findReceiveUser = await userRepository.findOneBy({
    id: idReceive,
  });

  const findSendUser = await userRepository.findOneBy({
    id: idSend,
  });

  if (!findReceiveUser) throw new AppError(404, "Can not find receive user");

  if (!findSendUser) throw new AppError(404, "Can not find send user");

  const newInvite = inviteRepository.create({
    userIdReceive: body.userIdReceive,
    userIdSend: body.userIdSend,
  });

  await inviteRepository.save(newInvite);

  const returnNewInvite = await returnInviteSerializer.validate(newInvite, {
    stripUnknown: true,
  });

  await sendEmail({
    from: "completesuabanda@gmail.com",
    to: findReceiveUser.email,
    subject: "Você recebeu um convite",
    text: `O usuário ${findSendUser.name} te enviou um convite, caso aceite, enviar um email para ${findSendUser.email}. Acessa o site https://complete-sua-banda.vercel.app/ para mais informações.`
  })

  return returnNewInvite;
};
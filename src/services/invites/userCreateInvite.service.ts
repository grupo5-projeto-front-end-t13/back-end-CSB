import {
  iUserIdReceive,
  iUserIdSend,
} from "../../interfaces/invites.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { inviteRepository } from "../../repositories/inviteRepository";
import { returnInviteSerializer } from "../../serializers/invite/invite.serializers";
import { AppError } from "../../errors/errors";
import { sendEmail } from "../../utils/mailer";

export const userCreateInviteService = async (
  idReceive: iUserIdReceive,
  idSend: iUserIdSend
) => {
  const findReceiveUser = await userRepository.findOneBy({
    id: idReceive.id,
  });

  const findSendUser = await userRepository.findOneBy({
    id: idSend.id,
  });

  const findInviteSend = await inviteRepository.findOneBy({
    userIdReceive: { id: idReceive.id },
    userIdSend: { id: idSend.id },
  });

  const findInviteReceive = await inviteRepository.findOneBy({
    userIdReceive: { id: idSend.id },
    userIdSend: { id: idReceive.id },
  });

  if (!findReceiveUser) throw new AppError(404, "Can not find receive user");

  if (!findSendUser) throw new AppError(404, "Can not find send user");

  if (findInviteSend || findInviteReceive)
    throw new AppError(409, "Invite already exists");

  const newInvite = inviteRepository.create({
    userIdReceive: { id: idReceive.id },
    userIdSend: { id: idSend.id },
  });

  await inviteRepository.save(newInvite);

  const returnNewInvite = await returnInviteSerializer.validate(newInvite, {
    stripUnknown: true,
  });

  await sendEmail({
    from: "completesuabanda@gmail.com",
    to: findReceiveUser.email,
    subject: "Você recebeu um convite",
    text: `O usuário ${findSendUser.name} te enviou um convite, caso aceite, enviar um email para ${findSendUser.email}. Acesse o site https://complete-sua-banda.vercel.app/ para mais informações.`,
  });

  return returnNewInvite;
};

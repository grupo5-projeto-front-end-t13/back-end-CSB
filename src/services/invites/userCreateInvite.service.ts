import { iInviteRequest } from "../../interfaces/invites.interfaces";
import { userRepository } from "../../repositories/userRepository";
import { inviteRepository } from "../../repositories/inviteRepository";
import { returnInviteSerializer } from "../../serializers/invite/invite.serializers";
import { AppError } from "../../errors/errors";

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

  return returnNewInvite;
};
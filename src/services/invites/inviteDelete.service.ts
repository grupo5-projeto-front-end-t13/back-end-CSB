import { AppError } from "../../errors/errors";
import { inviteRepository } from "../../repositories/inviteRepository";

export const deleteInviteService = async (id: string,user: {id: string,type: string,isAdm: boolean}): Promise<void> => {
  const invite = await inviteRepository.createQueryBuilder("invites")
  .where("invites.id = :id_invite",{id_invite:id})
  .leftJoinAndSelect("invites.userIdReceive","receiver")
  .leftJoinAndSelect("invites.userIdSend","sender")
  .getOne()

  if(!(user.id === invite?.userIdReceive.id || user.id == invite?.userIdSend.id)){
    throw new AppError (401, 'You cannot delete an invitation that you do not own.');
  }

  await inviteRepository.remove(invite!);
};

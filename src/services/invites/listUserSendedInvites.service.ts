import { iInviteResponse } from "../../interfaces/invites.interfaces";

import { inviteRepository } from "../../repositories/inviteRepository";

export const listUserSendedInvitesService = async (
  userId: string
): Promise<iInviteResponse[]> => {
  const findInvites = await inviteRepository.findBy({
    userIdSend: { id: userId },
  });

  return findInvites;
};

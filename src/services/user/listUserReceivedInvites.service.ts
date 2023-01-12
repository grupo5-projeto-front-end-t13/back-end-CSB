import { iInviteResponse } from "../../interfaces/invites.interfaces";

import { inviteRepository } from "../../repositories/inviteRepository";

export const listUserReceivedInvitesService = async (
  userId: string
): Promise<iInviteResponse[]> => {
  const findInvites = await inviteRepository.findBy({
    userIdReceive: { id: userId },
  });

  return findInvites;
};

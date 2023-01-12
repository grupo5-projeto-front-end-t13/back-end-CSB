import { inviteRepository } from "../../repositories/inviteRepository";

export const deleteInviteService = async (id: string): Promise<void> => {
  const invite = await inviteRepository.findOneBy({ id: id });
  await inviteRepository.remove(invite!);
};

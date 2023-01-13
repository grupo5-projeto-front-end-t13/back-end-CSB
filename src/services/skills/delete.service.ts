import { skillRepository } from "../../repositories/skillRepository";

export const deleteSkillsService = async (id: string): Promise<void> => {
  const skill = await skillRepository.findOneBy({ id });
  await skillRepository.remove(skill!);
};

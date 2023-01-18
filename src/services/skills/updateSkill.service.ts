import { iSkill } from "../../interfaces/user.interfaces";
import { skillRepository } from "../../repositories/skillRepository";

export const updateSkillService = async (
  id: string,
  name: string
): Promise<iSkill> => {
  const skill = { id, name };

  await skillRepository.save(skill);

  return skill;
};

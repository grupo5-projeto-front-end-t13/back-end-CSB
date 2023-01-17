import { iSkill } from "../../interfaces/user.interfaces";
import { skillRepository } from "../../repositories/skillRepository";

export const listSkillsService = async (): Promise<iSkill[]> => {
  const listSkills = await skillRepository.find();

  return listSkills;
};

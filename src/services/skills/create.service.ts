import { skillRepository } from "../../repositories/skillRepository";

export const createSkillsService = async (name: string) => {
  const newSkill = skillRepository.create({ name });
  await skillRepository.save(newSkill);

  return newSkill;
};

import { AppError } from "../../errors/errors";
import { skillRepository } from "../../repositories/skillRepository";

export const createSkillsService = async (name: string) => {
  const findSkill = await skillRepository.findOneBy({ name });

  if (findSkill) throw new AppError(409, "Skill already exists");

  const newSkill = skillRepository.create({ name });

  await skillRepository.save(newSkill);

  return newSkill;
};

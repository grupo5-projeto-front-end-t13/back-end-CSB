import { skillRepository } from "../../repositories/skillRepository"

export const createSkillsService = async(bodyName: string) =>{
  const newSkill = skillRepository.create({name: bodyName})
  await skillRepository.save(newSkill)

  return newSkill
}
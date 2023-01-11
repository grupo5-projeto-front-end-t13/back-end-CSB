import { AppDataSource } from "../data-source";
import Skill from "../entities/skill.entity";

export const skillRepository = AppDataSource.getRepository(Skill);

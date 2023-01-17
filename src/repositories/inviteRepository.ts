import { AppDataSource } from "../data-source";
import Invites from "../entities/invites.entity";

export const inviteRepository = AppDataSource.getRepository(Invites);

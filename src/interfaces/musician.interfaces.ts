import { iInviteRequest } from "./invites.interfaces";

export interface iMusicianResquest {
  name: string;
  email: string;
  password: string;
  skills: iSkill[];
}

export interface iMusicianResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  state: string;
  skills: iSkill[];
  skill_level: string;
  social_media: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  invites: iInviteRequest[];
  isAdm: boolean;
}

export interface iSkill{
  id: string;
  name: string;
  // musicians: iMusicianResponse[]
}

export interface iMusicianUpdateRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  state: string;
  skill_level: string;
  social_media: string;
  image: string;
}

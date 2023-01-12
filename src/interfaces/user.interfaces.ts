import { iInviteRequest } from "./invites.interfaces";

export interface iSkill {
  id?: string;
  name?:string;
}

export interface iUserRequest {
  name: string;
  email: string;
  password: string;
  skills: iSkill;
  type: string;
}

export interface iUser {
  id: string;
  name: string;
  email: string;
  bio: string;
  state: string;
  type: string;
  genre?: string;
  username?: string;
  social_media: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  isAdm: boolean;
  skills: iSkill;
}

export interface iUserBand {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  state?: string | null;
  genre?: string | null;
  social_media?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  skills: iSkill;
}

export interface iUserCreateResponse {
  id?: string;
  name?: string;
  email?: string;
  skills?: iSkill;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
}

export interface iUserUpdateRequest {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  bio?: string;
  state?: string;
  genre?: string;
  social_media?: string;
  image?: string;
  skills: iSkill;
}

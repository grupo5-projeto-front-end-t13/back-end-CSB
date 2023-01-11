import { iInviteRequest } from "./invites.interfaces";

export interface iSkill {
  id?: string;
  name?: string;
}

export interface iUserRequest {
  name: string;
  email: string;
  password: string;
  skillsId: string;
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
  invites: iInviteRequest[];
  isAdm: boolean;
  skillsId: string;
}

export interface iUserCreateResponse {
  id?: string;
  name?: string;
  email?: string;
  skillsId?: string;
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
}

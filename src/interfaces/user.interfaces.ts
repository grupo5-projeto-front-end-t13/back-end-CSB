export interface iSkill {
  id?: string;
  name?: string;
}

export interface iUserRequest {
  name: string;
  email: string;
  password: string;
  skills: iSkill | null;
  type: string;
  isAdm?: boolean;
}

export interface iUser {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  state?: string | null;
  type: string;
  genre?: string | null;
  username?: string | null;
  social_media?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  isAdm: boolean;
  verified: boolean;
  skills: iSkill | null;
}

export interface iUserMusician {
  id: string;
  name: string;
  username?: string | null;
  email: string;
  bio?: string | null;
  state?: string | null;
  social_media?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  skills: iSkill | null;
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
  skills: iSkill | null;
}

export interface iUserCreateResponse {
  id?: string;
  name?: string;
  email?: string;
  skills?: iSkill | null;
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
  skills: iSkill | null;
}

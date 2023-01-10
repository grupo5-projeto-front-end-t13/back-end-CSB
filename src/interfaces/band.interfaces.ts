import { iInviteRequest } from "./invites.interfaces";

export interface iBandRequest {
  name: string;
  email: string;
  password: string;
}


export interface iBandUpdateRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
  state: string;
  genre: string;
  social_media: string;
  image: string;
}

export interface iBandResponse {
  id: string;
  name: string;
  email: string;
  bio: string;
  state: string;
  genre: string;
  social_media: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  requirement: iRequirement[];
  invites: iInviteRequest[];
  isAdm: boolean;
}

export interface iRequirement {
  id:string;
  name: string;
  // bands: iBandResponse[]
}
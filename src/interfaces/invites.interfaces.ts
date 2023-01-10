export interface iInviteRequest {
  bandId: string;
  musicianId: string;
  isInviteBand: boolean;
  isInviteMusician: boolean;
}

export interface iInviteResponse {
  id: string;
  bandId: string;
  musicianId: string;
  isInviteBand: boolean;
  isInviteMusician: boolean;
  createdAt: Date;
  updatedAt: Date;
}



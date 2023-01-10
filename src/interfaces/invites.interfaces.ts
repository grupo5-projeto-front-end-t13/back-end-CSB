export interface iInviteRequest {
  userIdSend : string;
  userIdReceiver: string;
}

export interface iInviteResponse {
  id: string;
  userIdSend : string;
  userIdReceiver: string;
  createdAt: Date;
}



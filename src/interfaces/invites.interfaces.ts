export interface iUserIdSend {
  id: string;
}
export interface iUserIdReceive {
  id: string;
}

export interface iInviteRequest {
  userIdSend: iUserIdSend;
  userIdReceive: iUserIdReceive;
}

export interface iInviteResponse {
  id: string;
  userIdSend: iUserIdSend;
  userIdReceive: iUserIdReceive;
  createdAt: Date;
}

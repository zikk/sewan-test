export interface MessageStatusDTO {
  target: string;
  status: string;
  sentAt?: string;
  failMessage?: string | null;
}

export interface MessageDTO {
  id: string;
  content: string;
  createdAt: string;
  statuses: MessageStatusDTO[] | [];
}

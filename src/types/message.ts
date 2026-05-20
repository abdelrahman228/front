export type Message = {
  _id: string;
  content?: string;
  attachments?: string[];
  receiverId?: string;
  senderId?: string;
  createdAt?: string;
  updatedAt?: string;
};

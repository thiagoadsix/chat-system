export type ReplyMessageRequest = {
  id: number;
  chatId: string;
  content: string;
  replyTo: string;
  sender: string;
};

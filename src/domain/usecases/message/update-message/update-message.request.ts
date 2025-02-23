export type UpdateMessageRequest = {
  id: number;
  chatId: string;
  sender: string;
  content: string;
}
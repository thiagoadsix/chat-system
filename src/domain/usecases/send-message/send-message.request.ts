export type SendMessageRequest = {
  userId: string;
  content: string;
  replyTo?: string;
}
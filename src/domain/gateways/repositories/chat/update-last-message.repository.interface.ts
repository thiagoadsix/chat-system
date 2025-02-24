import { Message } from "@domain/entities/message.entity";

export interface UpdateLastMessage {
  updateLastMessage(message: Message): Promise<void>;
}

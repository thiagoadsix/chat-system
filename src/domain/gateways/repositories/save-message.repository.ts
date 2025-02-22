import type { ChatMessage } from "@domain/entities/chat-message.entity";

export interface SaveMessage {
  save(message: SaveMessage.Input): Promise<void>;
}

export namespace SaveMessage {
  export type Input = ChatMessage;
}

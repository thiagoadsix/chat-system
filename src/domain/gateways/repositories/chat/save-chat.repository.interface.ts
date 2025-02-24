import { Chat } from "@domain/entities/chat.entity";

export interface SaveChat {
  save(chat: SaveChat.Input): Promise<void>;
}

export namespace SaveChat {
  export type Input = Chat;
}
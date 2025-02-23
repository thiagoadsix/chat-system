import type { Message } from "@domain/entities";

export interface SaveMessage {
  save(message: SaveMessage.Input): Promise<void>;
}

export namespace SaveMessage {
  export type Input = Message;
}

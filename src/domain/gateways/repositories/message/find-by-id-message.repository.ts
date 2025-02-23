import { Message } from "@domain/entities";

export interface FindByIdMessage {
  findById(message: FindByIdMessage.Input): Promise<Message | null>;
}

export namespace FindByIdMessage {
  export type Input = {
    id: number;
    chatId: string;
  };
}

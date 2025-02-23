export interface UpdateMessage {
  update(message: UpdateMessage.Input): Promise<void>;
}

export namespace UpdateMessage {
  export type Input = {
    id: number;
    chatId: string;
    sender: string;
    content: string;
  };
}

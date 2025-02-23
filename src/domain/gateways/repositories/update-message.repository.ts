export interface UpdateMessage {
  update(message: UpdateMessage.Input): Promise<void>;
}

export namespace UpdateMessage {
  export type Input = {
    id: number;
    userId: string;
    content: string;
    replyTo?: string;
  };
}

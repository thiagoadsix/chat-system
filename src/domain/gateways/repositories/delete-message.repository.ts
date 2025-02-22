export interface DeleteMessage {
  delete(message: DeleteMessage.Input): Promise<void>;
}

export namespace DeleteMessage {
  export type Input = {
    id: string;
    userId: string;
  };
}

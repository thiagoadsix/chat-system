import { ChatMessage } from '@domain/entities/chat-message.entity';

export interface MessageBroker {
  publish(event: MessageBroker.Input): Promise<void>;
}

export namespace MessageBroker {
  export type Input = {
    action: "send" | "update" | "delete" | "reply"
    message: Partial<ChatMessage>
  };
}

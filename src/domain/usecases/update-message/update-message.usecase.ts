import { ChatMessage } from "@domain/entities/chat-message.entity";
import { MessageBroker } from "@domain/gateways/brokers";

import type { UpdateMessageRequest } from "./update-message.request";

export class UpdateMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: UpdateMessageRequest): Promise<void> {
    const { messageId, userId, content } = input;

    const message = new ChatMessage({
      messageId,
      userId,
      content,
    });

    await this.messageBroker.publish({
      action: "update",
      message,
    });
  }
}

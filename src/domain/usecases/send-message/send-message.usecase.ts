import { ChatMessage } from "@domain/entities/chat-message.entity";
import { MessageBroker } from "@domain/gateways/brokers";

import type { SendMessageRequest } from "./send-message.request";

export class SendMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: SendMessageRequest): Promise<void> {
    const { userId, content, replyTo } = input;

    const message = new ChatMessage({
      userId,
      content,
      replyTo,
    });

    await this.messageBroker.publish({
      action: "send",
      message,
    });
  }
}

import { ChatMessage } from "@domain/entities/chat-message.entity";
import { MessageBroker } from "@domain/gateways/brokers";

import type { ReplyMessageRequest } from "./reply-message.request";

export class ReplyMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: ReplyMessageRequest): Promise<void> {
    const { messageId, userId, content, replyTo } = input;

    const message = new ChatMessage({
      messageId,
      userId,
      content,
      replyTo,
    });

    message.refreshUpdatedAt();

    await this.messageBroker.publish({
      action: "reply",
      message,
    });
  }
}

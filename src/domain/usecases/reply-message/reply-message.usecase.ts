import { Message } from "@domain/entities";
import { MessageBroker } from "@domain/gateways/brokers";

import type { ReplyMessageRequest } from "./reply-message.request";

export class ReplyMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: ReplyMessageRequest): Promise<void> {
    const { id, chatId, content, sender } = input;

    const message = new Message({
      replyTo: id,
      chatId,
      sender,
      content,
    });

    message.refreshUpdatedAt();

    await this.messageBroker.publish({
      action: "reply",
      message,
    });
  }
}

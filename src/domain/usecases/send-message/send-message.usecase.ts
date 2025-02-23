import { Message } from "@domain/entities";
import { MessageBroker } from "@domain/gateways/brokers";

import type { SendMessageRequest } from "./send-message.request";

export class SendMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: SendMessageRequest): Promise<void> {
    const { sender, content, chatId } = input;

    const message = new Message({
      content,
      sender,
      chatId
    });

    await this.messageBroker.publish({
      action: "send",
      message,
    });
  }
}

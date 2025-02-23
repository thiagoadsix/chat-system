import { Message } from "@domain/entities/message.entity";
import { MessageBroker } from "@domain/gateways/brokers";
import { FindByIdMessage } from "@domain/gateways/repositories/message";

import type { UpdateMessageRequest } from "./update-message.request";

export class UpdateMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
    private readonly messageRepository: FindByIdMessage,
  ) {}

  async execute(input: UpdateMessageRequest): Promise<void> {
    const { id, chatId, sender, content } = input;

    const entity = await this.messageRepository.findById({ id, chatId });

    if (!entity) {
      throw new Error("Message not found");
    }

    const message = new Message({
      ...entity,
      sender,
      content,
    });

    message.setEdited();
    message.refreshUpdatedAt();

    await this.messageBroker.publish({
      action: "update",
      message,
    });
  }
}

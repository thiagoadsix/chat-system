import { MessageBroker } from "@domain/gateways/brokers";

import type { DeleteMessageRequest } from "./delete-message.request";

export class DeleteMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: DeleteMessageRequest): Promise<void> {
    console.log({input})
    const { id, chatId, sender } = input;

    await this.messageBroker.publish({
      action: "delete",
      message: {
        id,
        chatId,
        sender
      },
    });
  }
}

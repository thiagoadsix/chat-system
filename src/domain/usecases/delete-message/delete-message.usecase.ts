import { MessageBroker } from "@domain/gateways/brokers";

import type { DeleteMessageRequest } from "./delete-message.request";

export class DeleteMessageUsecase {
  constructor(
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(input: DeleteMessageRequest): Promise<void> {
    const { id, userId } = input;

    await this.messageBroker.publish({
      action: "delete",
      message: {
        id,
        userId
      },
    });
  }
}

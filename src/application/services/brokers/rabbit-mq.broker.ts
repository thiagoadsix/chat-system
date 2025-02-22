import { MessageBroker } from "@domain/gateways/brokers";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

export class RabbitMQBroker implements MessageBroker {
  constructor(
    private readonly client: RabbitMQClient,
  ) {}

  async publish(event: MessageBroker.Input): Promise<void> {
    await this.client.publishChatEvent(event);
  }
}
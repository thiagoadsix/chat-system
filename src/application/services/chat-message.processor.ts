import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";
import { ChatMessageRepository } from "@application/repositories/chat-message.repository";
import { ChatMessage } from "@domain/entities/chat-message.entity";

export class ChatMessageProcessor {
  constructor(
    private readonly rabbitMQClient: RabbitMQClient,
    private readonly chatMessageRepository: ChatMessageRepository
  ) {}

  async processMessage(action: string) {
    await this.rabbitMQClient.consumeChatEvent(action, async (message: ChatMessage) => {
      switch(action) {
        case 'send':
          await this.chatMessageRepository.save(message);
          break;
      }
    });
  }
}
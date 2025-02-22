import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";
import { ChatMessageRepository } from "@application/repositories/chat-message.repository";
import { ChatMessage } from "@domain/entities/chat-message.entity";

export class ChatMessageProcessor {
  constructor(
    private readonly rabbitMQClient: RabbitMQClient,
    private readonly chatMessageRepository: ChatMessageRepository
  ) {}

  async processMessage(action: string): Promise<void> {
    const queue = `chat_messages_${action}`;

    await this.rabbitMQClient.consumeChatEvent(queue, action, async (message: {action: string, message: ChatMessage}) => {
      switch (action) {
        case 'send':
          await this.chatMessageRepository.save(message.message);
          break;
        case 'delete':
          await this.chatMessageRepository.delete(message.message);
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
          break;
      }
    });
  }
}

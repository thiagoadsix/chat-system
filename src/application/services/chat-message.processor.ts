import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";
import { ChatMessageRepository } from "@application/repositories/chat-message.repository";
import { Message } from "@domain/entities";

export class ChatMessageProcessor {
  constructor(
    private readonly rabbitMQClient: RabbitMQClient,
    private readonly chatMessageRepository: ChatMessageRepository
  ) {}

  async processMessage(action: string): Promise<void> {
    const queue = `chat_messages_${action}`;

    await this.rabbitMQClient.consumeChatEvent(queue, action, async (message: {action: string, message: Message}) => {
      switch (action) {
        case 'send':
          await this.chatMessageRepository.save(message.message);
          break;
        case 'delete':
          await this.chatMessageRepository.delete({
            id: message.message.id,
            chatId: message.message.chatId,
            sender: message.message.sender,
          });
          break;
        case 'update':
          await this.chatMessageRepository.update(message.message);
          break;
        case 'reply':
          await this.chatMessageRepository.update({
            ...message.message,
            replyTo: message.message.replyTo || '',
          });
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
          break;
      }
    });
  }
}

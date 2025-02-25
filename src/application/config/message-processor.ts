import { RabbitMQClient } from '@application/utils/clients/rabbit-mq.client';
import { DynamoDBClient } from '@application/utils/clients/dynamo-db.client';
import { MessageRepository } from '@application/repositories/message.repository';
import { ChatMessageProcessor } from '@application/services/chat-message.processor';
import { ChatRepository } from '@application/repositories/chat.repository';

export async function setupMessageProcessing(rabbitMQClient: RabbitMQClient) {
  const dynamoDBClient = new DynamoDBClient().getClient();
  const chatMessageRepository = new MessageRepository(dynamoDBClient);
  const chatRepository = new ChatRepository(dynamoDBClient);
  const processor = new ChatMessageProcessor(rabbitMQClient, chatMessageRepository, chatRepository);

  const actions = ['send', 'delete', 'update', 'reply'];

  for (const action of actions) {
    processor.processMessage(action);
  }
}
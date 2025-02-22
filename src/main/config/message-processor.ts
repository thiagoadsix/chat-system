import { RabbitMQClient } from '@application/utils/clients/rabbit-mq.client';
import { DynamoDBClient } from '@application/utils/clients/dynamo-db.client';
import { ChatMessageRepository } from '@application/repositories/chat-message.repository';
import { ChatMessageProcessor } from '@application/services/chat-message.processor';

export async function setupMessageProcessing(rabbitMQClient: RabbitMQClient) {
  const dynamoDBClient = new DynamoDBClient();
  const chatMessageRepository = new ChatMessageRepository(dynamoDBClient.getClient());
  const chatMessageProcessor = new ChatMessageProcessor(rabbitMQClient, chatMessageRepository);

  await chatMessageProcessor.processMessage('send');
  await chatMessageProcessor.processMessage('edit');
  await chatMessageProcessor.processMessage('delete');
  await chatMessageProcessor.processMessage('reply');
}
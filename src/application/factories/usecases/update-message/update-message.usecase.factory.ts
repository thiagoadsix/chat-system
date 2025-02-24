import { UpdateMessageUsecase } from "@domain/usecases/message";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";
import { ChatMessageRepository } from "@application/repositories/chat-message.repository";
import { DynamoDBClient } from "@application/utils/clients/dynamo-db.client";

export const updateMessageUsecaseFactory = (): UpdateMessageUsecase => {
  const dynamoDBClient = new DynamoDBClient().getClient();
  const broker = new RabbitMQBroker(new RabbitMQClient());
  const messageRepository = new ChatMessageRepository(dynamoDBClient);
  return new UpdateMessageUsecase(broker, messageRepository);
};

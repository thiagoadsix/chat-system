import { UpdateMessageUsecase } from "@domain/usecases/update-message/update-message.usecase";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";
import { ChatMessageRepository } from "@application/repositories/chat-message.repository";
import { DynamoDBClient } from "@application/utils/clients/dynamo-db.client";

export const updateMessageUsecaseFactory = (): UpdateMessageUsecase => {
  const broker = new RabbitMQBroker(new RabbitMQClient());
  const messageRepository = new ChatMessageRepository(new DynamoDBClient().getClient());
  return new UpdateMessageUsecase(broker, messageRepository);
};

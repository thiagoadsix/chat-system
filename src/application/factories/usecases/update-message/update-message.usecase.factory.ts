import { UpdateMessageUsecase } from "@domain/usecases/update-message/update-message.usecase";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

export const updateMessageUsecaseFactory = (): UpdateMessageUsecase => {
  const broker = new RabbitMQBroker(new RabbitMQClient());
  return new UpdateMessageUsecase(broker);
};

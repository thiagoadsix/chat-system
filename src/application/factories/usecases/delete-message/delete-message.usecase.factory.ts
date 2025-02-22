import { DeleteMessageUsecase } from "@domain/usecases/delete-message/delete-message.usecase";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

export const deleteMessageUsecaseFactory = (): DeleteMessageUsecase => {
  const broker = new RabbitMQBroker(new RabbitMQClient());
  return new DeleteMessageUsecase(broker);
};

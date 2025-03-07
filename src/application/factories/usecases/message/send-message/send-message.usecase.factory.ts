import { SendMessageUsecase } from "@domain/usecases/message";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

export const sendMessageUsecaseFactory = (): SendMessageUsecase => {
  const broker = new RabbitMQBroker(new RabbitMQClient());
  return new SendMessageUsecase(broker);
};

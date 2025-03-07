import { ReplyMessageUsecase } from "@domain/usecases/message";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

export const replyMessageUsecaseFactory = (): ReplyMessageUsecase => {
  const broker = new RabbitMQBroker(new RabbitMQClient());
  return new ReplyMessageUsecase(broker);
};

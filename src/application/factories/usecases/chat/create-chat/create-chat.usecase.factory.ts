import { CreateChatUsecase } from "@domain/usecases/chat";

import { ChatRepository } from "@application/repositories/chat.repository";
import { DynamoDBClient } from "@application/utils/clients/dynamo-db.client";

export const createChatUsecaseFactory = (): CreateChatUsecase => {
  const dynamoDBClient = new DynamoDBClient().getClient();
  const chatRepository = new ChatRepository(dynamoDBClient);
  return new CreateChatUsecase(chatRepository);
};

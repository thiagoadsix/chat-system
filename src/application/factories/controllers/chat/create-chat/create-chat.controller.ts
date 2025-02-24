import { CreateChatController } from "@presentation/controllers/chat/create-chat/create-chat.controller";
import { createChatUsecaseFactory } from "@application/factories/usecases/chat/create-chat/create-chat.usecase.factory";

export const createChatControllerFactory = (): CreateChatController => {
  const createChatUsecase = createChatUsecaseFactory();
  return new CreateChatController(createChatUsecase);
}
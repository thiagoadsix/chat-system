import { UpdateMessageController } from "@presentation/controllers/update-message/update-message.controller";
import { updateMessageUsecaseFactory } from "@application/factories/usecases/message/update-message/update-message.usecase.factory";

export const updateMessageControllerFactory = (): UpdateMessageController => {
  const updateMessageUsecase = updateMessageUsecaseFactory();
  return new UpdateMessageController(updateMessageUsecase);
}
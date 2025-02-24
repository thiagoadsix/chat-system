import { DeleteMessageController } from "@presentation/controllers/delete-message/delete-message.controller";
import { deleteMessageUsecaseFactory } from "@application/factories/usecases/delete-message/delete-message.usecase.factory";

export const deleteMessageControllerFactory = (): DeleteMessageController => {
  const deleteMessageUsecase = deleteMessageUsecaseFactory();
  return new DeleteMessageController(deleteMessageUsecase);
}
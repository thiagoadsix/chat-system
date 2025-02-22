import { SendMessageController } from "@presentation/controllers/send-message/send-message.controller";
import { sendMessageUsecaseFactory } from "@application/factories/usecases/send-message/send-message.usecase.factory";

export const sendMessageControllerFactory = (): SendMessageController => {
  const sendMessageUsecase = sendMessageUsecaseFactory();
  return new SendMessageController(sendMessageUsecase);
}
import { SendMessageController } from "@presentation/controllers/message/send-message/send-message.controller";
import { sendMessageUsecaseFactory } from "@application/factories/usecases/message/send-message/send-message.usecase.factory";

export const sendMessageControllerFactory = (): SendMessageController => {
  const sendMessageUsecase = sendMessageUsecaseFactory();
  return new SendMessageController(sendMessageUsecase);
}
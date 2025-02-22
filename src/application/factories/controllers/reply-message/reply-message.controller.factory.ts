import { ReplyMessageController } from "@presentation/controllers/reply-message/reply-message.controller";
import { replyMessageUsecaseFactory } from "@application/factories/usecases/reply-message/reply-message.usecase.factory";

export const replyMessageControllerFactory = (): ReplyMessageController => {
  const replyMessageUsecase = replyMessageUsecaseFactory();
  return new ReplyMessageController(replyMessageUsecase);
}
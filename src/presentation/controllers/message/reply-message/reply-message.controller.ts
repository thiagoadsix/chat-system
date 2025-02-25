import { ReplyMessageUsecase } from "@domain/usecases/message";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class ReplyMessageController implements Controller {
  constructor(private readonly replyMessageUsecase: ReplyMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { chatId, messageId } = httpRequest.params;
    const { content, replyTo } = httpRequest.body;

    const result = await this.replyMessageUsecase.execute({ id: Number(messageId), chatId, sender: httpRequest.userId!, content, replyTo });

    return ok(result);
  }
}

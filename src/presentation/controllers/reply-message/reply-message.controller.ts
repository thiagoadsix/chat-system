import { ReplyMessageUsecase } from "@domain/usecases/reply-message/reply-message.usecase";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class ReplyMessageController implements Controller {
  constructor(private readonly replyMessageUsecase: ReplyMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { messageId } = httpRequest.params;
    const { userId, content, replyTo } = httpRequest.body;

    const result = await this.replyMessageUsecase.execute({ messageId, userId, content, replyTo });

    return ok(result);
  }
}

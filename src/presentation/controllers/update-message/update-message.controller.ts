import { UpdateMessageUsecase } from "@domain/usecases/message";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class UpdateMessageController implements Controller {
  constructor(private readonly updateMessageUsecase: UpdateMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { chatId, messageId } = httpRequest.params;
    const { content, sender } = httpRequest.body;

    const result = await this.updateMessageUsecase.execute({ id: Number(messageId), content, sender, chatId });

    return ok(result);
  }
}

import { UpdateMessageUsecase } from "@domain/usecases/update-message/update-message.usecase";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class UpdateMessageController implements Controller {
  constructor(private readonly updateMessageUsecase: UpdateMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { messageId, content, userId } = httpRequest.body;

    const result = await this.updateMessageUsecase.execute({ messageId, content, userId, });

    return ok(result);
  }
}

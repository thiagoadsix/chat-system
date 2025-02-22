import { DeleteMessageUsecase } from "@domain/usecases/delete-message/delete-message.usecase";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class DeleteMessageController implements Controller {
  constructor(private readonly deleteMessageUsecase: DeleteMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { messageId } = httpRequest.params;
    const { userId } = httpRequest.body;

    const result = await this.deleteMessageUsecase.execute({ messageId, userId });

    return ok(result);
  }
}

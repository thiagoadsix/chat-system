import { DeleteMessageUsecase } from "@domain/usecases/message";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class DeleteMessageController implements Controller {
  constructor(private readonly deleteMessageUsecase: DeleteMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { chatId, messageId } = httpRequest.params;

    const result = await this.deleteMessageUsecase.execute({ id: Number(messageId), chatId, sender: httpRequest.userId! });

    return ok(result);
  }
}

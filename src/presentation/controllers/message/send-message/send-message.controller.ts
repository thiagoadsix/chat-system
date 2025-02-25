import { SendMessageUsecase } from "@domain/usecases/message";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class SendMessageController implements Controller {
  constructor(private readonly sendMessageUsecase: SendMessageUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { chatId } = httpRequest.params;
    const { content } = httpRequest.body;

    const result = await this.sendMessageUsecase.execute({ content, sender: httpRequest.userId!, chatId });

    return ok(result);
  }
}

import { CreateChatUsecase } from "@domain/usecases/chat";

import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";
import { ok } from "@presentation/helpers";

export class CreateChatController implements Controller {
  constructor(private readonly createChatUsecase: CreateChatUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { participants } = httpRequest.body;

    const result = await this.createChatUsecase.execute({ participants });

    return ok(result);
  }
}

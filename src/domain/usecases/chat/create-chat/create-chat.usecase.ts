import { SaveChat } from "@domain/gateways/repositories/chat";
import { Chat } from "@domain/entities";

import { CreateChatRequest } from "./create-chat.request";
import { CreateChatResponse } from "./create-chat.response";

export class CreateChatUsecase {
  constructor(
    private readonly chatRepository: SaveChat,
  ){}

  async execute(request: CreateChatRequest): Promise<CreateChatResponse> {
    const chat = new Chat({
      participants: request.participants,
    });

    await this.chatRepository.save(chat);

    return {
      id: chat.id,
    };
  }
}
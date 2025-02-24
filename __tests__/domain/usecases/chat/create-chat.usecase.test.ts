import { describe, it, expect, beforeEach } from "vitest";

import { chatMockRepository } from "@tests/mocks/domain/gateways/repositories/chat.repository.mock";

import { CreateChatUsecase } from "@domain/usecases/chat/create-chat/create-chat.usecase";

describe("CreateChatUsecase", () => {
  let sut: CreateChatUsecase;

  beforeEach(() => {
    sut = new CreateChatUsecase(chatMockRepository);
    vi.clearAllMocks();
  });

  describe("execute", () => {
    it("should be able to create a chat", async () => {
      const request = {
        participants: ["1", "2"],
      };

      const response = await sut.execute(request);

      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      expect(chatMockRepository.save).toHaveBeenCalled();
    });
  });
});
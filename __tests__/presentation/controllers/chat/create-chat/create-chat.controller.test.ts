import { describe, it, expect, beforeEach } from "vitest";

import { CreateChatUsecase } from "@domain/usecases/chat";

import { CreateChatController } from "@presentation/controllers/chat/create-chat/create-chat.controller";

import { chatMockRepository } from "@tests/mocks/domain/gateways/repositories/chat.repository.mock";

describe("CreateChatController", () => {
  let sut: CreateChatController;

  beforeEach(() => {
    const createChatUsecase = new CreateChatUsecase(chatMockRepository);
    sut = new CreateChatController(createChatUsecase);
  });

  describe("handle", () => {
    it("should return a 200 status code", async () => {
      const httpRequest = {
        body: { participants: ["1", "2"] },
      };

      const result = await sut.handle(httpRequest);

      expect(result.statusCode).toEqual(200);
    });
  });
});
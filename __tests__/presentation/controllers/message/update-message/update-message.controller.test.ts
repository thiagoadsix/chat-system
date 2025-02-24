import { describe, it, expect, beforeEach } from "vitest";

import { UpdateMessageUsecase } from "@domain/usecases/message";

import { UpdateMessageController } from "@presentation/controllers/message/update-message/update-message.controller";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";
import { messageMockRepository } from "@tests/mocks/domain/gateways/repositories/message.repository.mock";

describe("ReplyMessageController", () => {
  let sut: UpdateMessageController;

  beforeEach(() => {
    const updateMessageUsecase = new UpdateMessageUsecase(messageMockBroker, messageMockRepository);
    sut = new UpdateMessageController(updateMessageUsecase);
  });

  describe("handle", () => {
    it("should return a 200 status code", async () => {
      const httpRequest = {
        params: { messageId: "1", chatId: "1" },
        body: { sender: "1", content: "test", replyTo: "2" },
      };

      const result = await sut.handle(httpRequest);

      expect(result.statusCode).toEqual(200);
    });
  });
});
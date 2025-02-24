import { describe, it, expect, beforeEach } from "vitest";

import { ReplyMessageUsecase } from "@domain/usecases/message";

import { ReplyMessageController } from "@presentation/controllers/message/reply-message/reply-message.controller";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";

describe("ReplyMessageController", () => {
  let sut: ReplyMessageController;

  beforeEach(() => {
    const replyMessageUsecase = new ReplyMessageUsecase(messageMockBroker);
    sut = new ReplyMessageController(replyMessageUsecase);
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
import { describe, it, expect, beforeEach } from "vitest";

import { SendMessageUsecase } from "@domain/usecases/message";

import { SendMessageController } from "@presentation/controllers/message/send-message/send-message.controller";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";

describe("SendMessageController", () => {
  let sut: SendMessageController;

  beforeEach(() => {
    const sendMessageUsecase = new SendMessageUsecase(messageMockBroker);
    sut = new SendMessageController(sendMessageUsecase);
  });

  describe("handle", () => {
    it("should return a 200 status code", async () => {
      const httpRequest = {
        body: { content: "test", sender: "1" },
        params: { chatId: "1" },
      };

      const result = await sut.handle(httpRequest);

      expect(result.statusCode).toEqual(200);
    });
  });
});
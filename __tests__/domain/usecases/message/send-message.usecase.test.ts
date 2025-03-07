import { describe, it, expect, beforeEach } from "vitest";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";

import { SendMessageUsecase } from "@domain/usecases/message/send-message/send-message.usecase";

describe("SendMessageUsecase", () => {
  let sut: SendMessageUsecase;

  beforeEach(() => {
    sut = new SendMessageUsecase(messageMockBroker);
  });

  describe("execute", () => {
    it("should be able to send a message", async () => {
      const request = {
        sender: "1",
        content: "Hello, world!",
        chatId: "1",
      };

      await sut.execute(request);

      expect(messageMockBroker.publish).toHaveBeenCalled();
    });
  });
});
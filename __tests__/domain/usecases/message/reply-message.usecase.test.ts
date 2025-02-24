import { describe, it, expect, beforeEach } from "vitest";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";

import { ReplyMessageUsecase } from "@domain/usecases/message/reply-message/reply-message.usecase";

describe("ReplyMessageUsecase", () => {
  let sut: ReplyMessageUsecase;

  beforeEach(() => {
    sut = new ReplyMessageUsecase(messageMockBroker);
  });

  describe("execute", () => {
    it("should be able to reply to a message", async () => {
      const request = {
        id: 1,
        chatId: "1",
        sender: "1",
        content: "Hello, world!",
        replyTo: "1",
      };

      await sut.execute(request);

      expect(messageMockBroker.publish).toHaveBeenCalled();
    });
  });
});
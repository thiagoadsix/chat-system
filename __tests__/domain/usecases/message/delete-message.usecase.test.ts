import { describe, it, expect, beforeEach } from "vitest";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";

import { DeleteMessageUsecase } from "@domain/usecases/message/delete-message/delete-message.usecase";

describe("DeleteMessageUsecase", () => {
  let sut: DeleteMessageUsecase;

  beforeEach(() => {
    sut = new DeleteMessageUsecase(messageMockBroker);
  });

  describe("execute", () => {
    it("should be able to delete a message", async () => {
      const request = {
        id: 1,
        chatId: "1",
        sender: "1",
      };

      await sut.execute(request);

      expect(messageMockBroker.publish).toHaveBeenCalled();
    });
  });
});
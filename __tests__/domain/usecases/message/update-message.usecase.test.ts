import { describe, it, expect, beforeEach } from "vitest";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";
import { messageMockRepository } from "@tests/mocks/domain/gateways/repositories/message.repository.mock";

import { UpdateMessageUsecase } from "@domain/usecases/message/update-message/update-message.usecase";

describe("UpdateMessageUsecase", () => {
  let sut: UpdateMessageUsecase;

  beforeEach(() => {
    sut = new UpdateMessageUsecase(messageMockBroker, messageMockRepository);
  });

  describe("execute", () => {
    it("should be able to update a message", async () => {
      const request = {
        id: 1,
        chatId: "1",
        sender: "1",
        content: "Hello, world!!!"
      };

      messageMockRepository.findById.mockResolvedValue({
        id: 1,
        chatId: "1",
        sender: "1",
        content: "Hello, world!",
      });

      await sut.execute(request);

      expect(messageMockBroker.publish).toHaveBeenCalled();
    });

    it("should throw an error if the message is not found", async () => {
      messageMockRepository.findById.mockResolvedValue(null);

      const request = {
        id: 1,
        chatId: "1",
        sender: "1",
        content: "Hello, world!!!"
      };

      await expect(sut.execute(request)).rejects.toThrow();
    });
  });
});
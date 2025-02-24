import { describe, it, expect, beforeEach } from "vitest";

import { DeleteMessageUsecase } from "@domain/usecases/message";

import { DeleteMessageController } from "@presentation/controllers/message/delete-message/delete-message.controller";

import { messageMockBroker } from "@tests/mocks/domain/gateways/brokers/message.broker.mock";

describe("DeleteMessageController", () => {
  let sut: DeleteMessageController;

  beforeEach(() => {
    const deleteMessageUsecase = new DeleteMessageUsecase(messageMockBroker);
    sut = new DeleteMessageController(deleteMessageUsecase);
  });

  describe("handle", () => {
    it("should return a 200 status code", async () => {
      const httpRequest = {
        params: { messageId: "1", chatId: "1" },
        body: { sender: "1" },
      };

      const result = await sut.handle(httpRequest);

      expect(result.statusCode).toEqual(200);
    });
  });
});
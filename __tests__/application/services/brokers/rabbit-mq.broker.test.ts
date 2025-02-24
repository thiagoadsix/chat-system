import { describe, it, expect, beforeEach, vi } from "vitest";
import { RabbitMQBroker } from "@application/services/brokers/rabbit-mq.broker";
import { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

describe("RabbitMQBroker", () => {
  let fakeRabbitMQClient: Partial<RabbitMQClient>;
  let broker: RabbitMQBroker;

  const event = {
    message: { id: 123, chatId: "456", sender: "user1", content: "hello" },
    action: "send",
  };

  beforeEach(() => {
    fakeRabbitMQClient = {
      publishChatEvent: vi.fn().mockResolvedValue(undefined),
    };
    broker = new RabbitMQBroker(fakeRabbitMQClient as RabbitMQClient);
  });

  it("should call publishChatEvent on the RabbitMQClient with the provided event", async () => {
    await broker.publish({
      message: { id: 123, chatId: "456", sender: "user1", content: "hello" },
      action: "send",
    });
    expect(fakeRabbitMQClient.publishChatEvent).toHaveBeenCalledWith(event);
  });
});

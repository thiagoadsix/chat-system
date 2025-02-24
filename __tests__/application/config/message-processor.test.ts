import { describe, it, expect, vi, afterEach } from "vitest";

import { setupMessageProcessing } from "@application/config/message-processor";
import { ChatMessageProcessor } from "@application/services/chat-message.processor";
import type { RabbitMQClient } from "@application/utils/clients/rabbit-mq.client";

describe("setupMessageProcessing", () => {
  const processSpy = vi.spyOn(ChatMessageProcessor.prototype, "processMessage").mockResolvedValue(undefined);

  afterEach(() => {
    processSpy.mockClear();
  });

  it("should call processMessage for each action: send, delete, update, and reply", async () => {
    const dummyRabbitMQClient = {} as RabbitMQClient;

    await setupMessageProcessing(dummyRabbitMQClient);

    expect(processSpy).toHaveBeenCalledTimes(4);
    expect(processSpy).toHaveBeenCalledWith("send");
    expect(processSpy).toHaveBeenCalledWith("delete");
    expect(processSpy).toHaveBeenCalledWith("update");
    expect(processSpy).toHaveBeenCalledWith("reply");
  });
});

import { describe, it, expect } from "vitest";

import { Message } from "../../../src/domain/entities/message.entity";

describe("Message", () => {
  it("should be able to create a message", () => {
    const message = new Message({
      content: "Hello, world!",
      chatId: "123",
      sender: "123",
    });

    expect(message).toBeDefined();
    expect(message.content).toBe("Hello, world!");
    expect(message.chatId).toBe("123");
    expect(message.sender).toBe("123");
  });

  it("should be able to set edited to true", () => {
    const message = new Message({
      content: "Hello, world!",
      chatId: "123",
      sender: "123",
    });

    message.setEdited();

    expect(message.edited).toBe(true);
  });

  it("should be able to refresh updatedAt", () => {
    const message = new Message({
      content: "Hello, world!",
      chatId: "123",
      sender: "123",
    });

    message.refreshUpdatedAt();

    expect(message.updatedAt).toBeDefined();
  });
});

import { describe, it, expect } from "vitest";

import { Chat } from "../../../src/domain/entities/chat.entity";

describe("Chat", () => {
  it("should create a chat", () => {
    const chat = new Chat({
      id: "1",
      participants: ["1", "2"]
    });

    expect(chat).toBeDefined();
  });

  it("should refresh the updated at date", () => {
    const chat = new Chat({
      id: "1",
      participants: ["1", "2"]
    });

    chat.refreshUpdatedAt();

    expect(chat.updatedAt).toBeDefined();
  })

  it("should generate a uuid if id is not provided", () => {
    const chat = new Chat({
      participants: ["1", "2"]
    });

    expect(chat.id).toBeDefined();
  })

  it("should generate created at date if not provided", () => {
    const chat = new Chat({
      participants: ["1", "2"]
    });

    expect(chat.createdAt).toBeDefined();
  })
});
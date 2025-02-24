import { DynamoDBClient, BatchWriteItemCommand, UpdateItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { Message } from "@domain/entities/message.entity";
import { Chat } from "@domain/entities/chat.entity";

import env from "@application/config/env";
import { ChatRepository } from "@application/repositories/chat.repository";
import { ChatSchema } from "@application/repositories/schemas/chat.schema";

env.dynamoDBTableName = "TestTable";
const ddbMock = mockClient(DynamoDBClient);

describe("ChatRepository", () => {
  let repository: ChatRepository;

  beforeEach(() => {
    ddbMock.reset();
    repository = new ChatRepository(new DynamoDBClient({ region: "us-east-1" }));
  });

  afterEach(() => {
    ddbMock.reset();
  });

  describe("save", () => {
    it("should build chat schemas for each participant and send a BatchWriteItemCommand", async () => {
      const chatInput = new Chat({
        id: "chat1",
        participants: ["userA", "userB"],
        lastMessage: "hello",
        lastMessageDate: 1600000000000,
        createdAt: 1590000000000,
        updatedAt: 1590000000000,
      });

      await repository.save(chatInput);

      expect(ddbMock.commandCalls(BatchWriteItemCommand).length).toBe(1);
      const call = ddbMock.commandCalls(BatchWriteItemCommand)[0];

      expect(call.args[0].input).toHaveProperty("RequestItems");
      expect(call.args[0].input.RequestItems).toHaveProperty("TestTable");

      const items = call.args[0].input.RequestItems?.["TestTable"] ?? [];
      expect(items.length).toBe(chatInput.participants.length);

      for (let i = 0; i < items.length; i++) {
        const marshalledItem = items[i].PutRequest?.Item;
        const item = marshalledItem ? unmarshall(marshalledItem) : undefined;
        if (item) {
          expect(item.userId).toBe(chatInput.participants[i]);
          expect(item.SK).toBe(`CHAT#${chatInput.id}`);
        }
      }
    });
  });

  describe("updateLastMessage", () => {
    it("should throw an error if no items are found for the given chatId", async () => {
      ddbMock.on(QueryCommand).resolves({ Items: [] });

      const messageInput = {
        chatId: "chat1",
        content: "new content",
        createdAt: 1650000000000,
      } as Message;

      await expect(repository.updateLastMessage(messageInput))
        .rejects
        .toThrow(`Any item found for chatId: ${messageInput.chatId}`);

      expect(ddbMock.commandCalls(QueryCommand).length).toBe(1);
    });

    it("should update each found item with the new lastMessage and lastMessageDate", async () => {
      const chatSchema = new ChatSchema({
        id: "chat1",
        userId: "userA",
        participants: ["userA"],
        lastMessage: "old content",
        lastMessageDate: 1600000000000,
        createdAt: 1590000000000,
        updatedAt: 1590000000000,
      });
      const marshalledChatSchema = marshall(chatSchema, {
        convertClassInstanceToMap: true,
        removeUndefinedValues: true,
      });

      ddbMock.on(QueryCommand).resolvesOnce({
        Items: [marshalledChatSchema],
        LastEvaluatedKey: undefined,
      });
      ddbMock.on(UpdateItemCommand).resolves({});

      const messageInput = {
        chatId: "chat1",
        content: "updated content",
        createdAt: 1650000000000,
      } as Message;

      await repository.updateLastMessage(messageInput);

      expect(ddbMock.commandCalls(QueryCommand).length).toBe(1);
      expect(ddbMock.commandCalls(UpdateItemCommand).length).toBe(1);

      const updateCall = ddbMock.commandCalls(UpdateItemCommand)[0];
      const updateParams = updateCall.args[0].input;
      expect(updateParams.TableName).toBe("TestTable");
      expect(updateParams.UpdateExpression)
        .toBe("set lastMessage = :content, lastMessageDate = :createdAt, GSI1SK = :gsi1sk, GSI2SK = :gsi2sk");

      const exprAttrValues = updateParams.ExpressionAttributeValues
        ? unmarshall(updateParams.ExpressionAttributeValues)
        : undefined;
      if (exprAttrValues) {
        expect(exprAttrValues[":content"]).toBe(messageInput.content);
        expect(exprAttrValues[":createdAt"]).toBe(messageInput.createdAt);
        expect(exprAttrValues[":gsi1sk"]).toBe(ChatSchema.buildGSI1SK(messageInput.createdAt));
        expect(exprAttrValues[":gsi2sk"]).toBe(ChatSchema.buildGSI2SK(messageInput.createdAt));
      }
    });
  });
});

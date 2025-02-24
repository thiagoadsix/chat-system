import { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { Message } from "@domain/entities";

import env from "@application/config/env";
import { ChatMessageRepository } from "@application/repositories/chat-message.repository";
import { MessageSchema } from "@application/repositories/schemas/message.schema";

env.dynamoDBTableName = "TestTable";
const ddbMock = mockClient(DynamoDBClient);

describe("ChatMessageRepository", () => {
  let repository: ChatMessageRepository;

  beforeEach(() => {
    ddbMock.reset();
    repository = new ChatMessageRepository(new DynamoDBClient({ region: "us-east-1" }));
  });

  afterEach(() => {
    ddbMock.reset();
  });

  describe("findById", () => {
    it("should return null if no item is found", async () => {
      ddbMock.on(GetItemCommand).resolves({});
      const result = await repository.findById({ id: 1, chatId: "chat1" });
      expect(result).toBeNull();
      expect(ddbMock.commandCalls(GetItemCommand).length).toBe(1);
    });

    it("should return a Message entity when an item is found", async () => {
      const messageInput = {
        id: 1,
        chatId: "chat1",
        sender: "user1",
        content: "Hello",
        createdAt: 1000,
        replyTo: undefined,
        edited: false,
      };
      const schema = new MessageSchema(messageInput);
      const marshalledItem = marshall(schema, {
        convertClassInstanceToMap: true,
        removeUndefinedValues: true,
      });
      ddbMock.on(GetItemCommand).resolves({ Item: marshalledItem });

      const result = await repository.findById({ id: messageInput.id, chatId: messageInput.chatId });
      expect(result).toEqual(schema.toEntity());
    });
  });

  describe("save", () => {
    it("should send a PutItemCommand with the marshalled MessageSchema", async () => {
      const messageInput = new Message({
        id: 1,
        chatId: "chat1",
        sender: "user1",
        content: "Hello",
        createdAt: 1000,
        replyTo: undefined,
        edited: false,
      });
      ddbMock.on(PutItemCommand).resolves({});

      await repository.save(messageInput);

      const putCalls = ddbMock.commandCalls(PutItemCommand);
      expect(putCalls.length).toBe(1);
      const commandInput = putCalls[0].args[0].input;
      expect(commandInput.TableName).toBe("TestTable");

      const item = commandInput.Item ? unmarshall(commandInput.Item) : undefined;
      if (item) {
        expect(item.PK).toBe(MessageSchema.buildPK(messageInput.chatId));
        expect(item.SK).toBe(MessageSchema.buildSK(messageInput.id));
      }
    });
  });

  describe("delete", () => {
    it("should send a DeleteItemCommand with the correct key", async () => {
      ddbMock.on(DeleteItemCommand).resolves({});
      const messageKey = { id: 1, chatId: "chat1", sender: "user1" };

      await repository.delete(messageKey);

      const deleteCalls = ddbMock.commandCalls(DeleteItemCommand);
      expect(deleteCalls.length).toBe(1);
      const commandInput = deleteCalls[0].args[0].input;
      expect(commandInput.TableName).toBe("TestTable");

      const key = commandInput.Key ? unmarshall(commandInput.Key) : undefined;
      if (key) {
        expect(key.PK).toBe(MessageSchema.buildPK(messageKey.chatId));
        expect(key.SK).toBe(MessageSchema.buildSK(messageKey.id));
      }
    });
  });

  describe("update", () => {
    it("should send an UpdateItemCommand with the correct update expression and attribute values", async () => {
      ddbMock.on(UpdateItemCommand).resolves({});
      const updateInput = {
        id: 1,
        chatId: "chat1",
        content: "Updated message",
        edited: true,
        sender: "user1",
      };

      await repository.update(updateInput);

      const updateCalls = ddbMock.commandCalls(UpdateItemCommand);
      expect(updateCalls.length).toBe(1);
      const commandInput = updateCalls[0].args[0].input;
      expect(commandInput.TableName).toBe("TestTable");

      const key = commandInput.Key ? unmarshall(commandInput.Key) : undefined;
      if (key) {
        expect(key.PK).toBe(MessageSchema.buildPK(updateInput.chatId));
        expect(key.SK).toBe(MessageSchema.buildSK(updateInput.id));
      }

      expect(commandInput.UpdateExpression).toContain("#content = :content");
      expect(commandInput.UpdateExpression).toContain("#edited = :edited");

      expect(commandInput.ExpressionAttributeNames).toHaveProperty("#content", "content");
      expect(commandInput.ExpressionAttributeNames).toHaveProperty("#edited", "edited");

      const exprValues = commandInput.ExpressionAttributeValues
        ? unmarshall(commandInput.ExpressionAttributeValues)
        : undefined;
      if (exprValues) {
        expect(exprValues[":content"]).toBe(updateInput.content);
        expect(exprValues[":edited"]).toBe(updateInput.edited);
      }
    });
  });
});

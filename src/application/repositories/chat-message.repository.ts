import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, PutItemCommand, PutItemCommandInput, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import env from "@main/config/env";
import { DeleteMessage, SaveMessage, UpdateMessage } from "@domain/gateways/repositories";

import { ChatMessageSchema } from "./schemas/chat-message.schema";

export class ChatMessageRepository implements SaveMessage, DeleteMessage, UpdateMessage {
  constructor(
    private readonly client: DynamoDBClient,
  ) {}

  async save(message: SaveMessage.Input): Promise<void> {
    const chatMessageSchema = new ChatMessageSchema({
      messageId: message.messageId,
      userId: message.userId,
      content: message.content,
      replyTo: message.replyTo,
      createdAt: message.createdAt,
    });

    const commandInput: PutItemCommandInput = {
      TableName: env.dynamoDBTableName,
      Item: marshall(chatMessageSchema, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
      }),
    };

    await this.client.send(new PutItemCommand(commandInput))
  }

  async delete(message: DeleteMessage.Input): Promise<void> {
    const commandInput: DeleteItemCommandInput = {
      TableName: env.dynamoDBTableName,
      Key: marshall({
        PK: ChatMessageSchema.buildPK(message.userId),
        SK: ChatMessageSchema.buildSK(message.messageId),
      }, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
      }),
    };

    await this.client.send(new DeleteItemCommand(commandInput));
  }

  async update(message: UpdateMessage.Input): Promise<void> {
    const { messageId, userId, ...updateFields } = message;

    const updateExpressions: string[] = [];
    const expressionValues: Record<string, any> = {};
    const expressionNames: Record<string, string> = {};

    Object.entries(updateFields).forEach(([key, value]) => {
      if (value !== undefined) {
        const attrName = `#${key}`;
        const attrValue = `:${key}`;

        updateExpressions.push(`${attrName} = ${attrValue}`);
        expressionNames[attrName] = key;
        expressionValues[attrValue] = value;
      }
    });

    const updateExpression = `SET ${updateExpressions.join(", ")}`;

    await this.client.send(
      new UpdateItemCommand({
        TableName: env.dynamoDBTableName,
        Key: marshall({
          PK: ChatMessageSchema.buildPK(userId),
          SK: ChatMessageSchema.buildSK(messageId),
        }, {
          removeUndefinedValues: true,
          convertClassInstanceToMap: true
        }),
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionNames,
        ExpressionAttributeValues: marshall(expressionValues, { removeUndefinedValues: true }),
      })
    );
  }
}
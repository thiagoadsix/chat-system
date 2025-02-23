import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, PutItemCommand, PutItemCommandInput, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import env from "@main/config/env";
import { DeleteMessage, SaveMessage, UpdateMessage } from "@domain/gateways/repositories";

import { MessageSchema } from "./schemas/message.schema";

export class ChatMessageRepository implements SaveMessage, DeleteMessage, UpdateMessage {
  constructor(
    private readonly client: DynamoDBClient,
  ) {}

  async save(message: SaveMessage.Input): Promise<void> {
    const messageSchema = new MessageSchema({
      id: message.id,
      chatId: message.chatId,
      sender: message.sender,
      content: message.content,
      replyTo: message.replyTo,
      createdAt: message.createdAt,
    });

    const commandInput: PutItemCommandInput = {
      TableName: env.dynamoDBTableName,
      Item: marshall(messageSchema, {
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
        PK: MessageSchema.buildPK(message.userId),
        SK: MessageSchema.buildSK(message.id),
      }, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
      }),
    };

    await this.client.send(new DeleteItemCommand(commandInput));
  }

  async update(message: UpdateMessage.Input): Promise<void> {
    const { id, userId, ...updateFields } = message;

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
          PK: MessageSchema.buildPK(userId),
          SK: MessageSchema.buildSK(id),
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
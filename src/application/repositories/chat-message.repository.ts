import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import env from "@main/config/env";
import { DeleteMessage, FindByIdMessage, SaveMessage, UpdateMessage } from "@domain/gateways/repositories";

import { MessageSchema } from "./schemas/message.schema";
import { Message } from "@domain/entities";

export class ChatMessageRepository implements SaveMessage, DeleteMessage, UpdateMessage, FindByIdMessage {
  constructor(
    private readonly client: DynamoDBClient,
  ) {}

  async findById(message: FindByIdMessage.Input): Promise<Message | null> {
    const commandInput: GetItemCommandInput = {
      TableName: env.dynamoDBTableName,
      Key: marshall({
        PK: MessageSchema.buildPK(message.chatId),
        SK: MessageSchema.buildSK(message.id),
      }, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
      }),
    };

    const result = await this.client.send(new GetItemCommand(commandInput));

    if (!result.Item) {
      return null;
    }

    return MessageSchema.fromUnmarshalledItem(unmarshall(result.Item)).toEntity();
  }

  async save(message: SaveMessage.Input): Promise<void> {
    const messageSchema = new MessageSchema({
      id: message.id,
      chatId: message.chatId,
      sender: message.sender,
      content: message.content,
      replyTo: message.replyTo,
      createdAt: message.createdAt,
      edited: message.edited
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
        PK: MessageSchema.buildPK(message.chatId),
        SK: MessageSchema.buildSK(message.id),
      }, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
      }),
    };

    await this.client.send(new DeleteItemCommand(commandInput));
  }

  async update(message: UpdateMessage.Input): Promise<void> {
    const { id, chatId, ...updateFields } = message;

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
          PK: MessageSchema.buildPK(chatId),
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
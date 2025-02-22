import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import env from "@main/config/env";
import { DeleteMessage, SaveMessage } from "@domain/gateways/repositories";

import { ChatMessageSchema } from "./schemas/chat-message.schema";

export class ChatMessageRepository implements SaveMessage, DeleteMessage {
  constructor(
    private readonly client: DynamoDBClient,
  ) {}

  async save(message: SaveMessage.Input): Promise<void> {
    const chatMessageSchema = new ChatMessageSchema({
      id: message.id,
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
        SK: ChatMessageSchema.buildSK(message.id),
      }, {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
      }),
    };

    await this.client.send(new DeleteItemCommand(commandInput));
  }
}
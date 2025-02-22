import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import env from "@main/config/env";
import { SaveMessage } from "@domain/gateways/repositories";

import { ChatMessageSchema } from "./schemas/chat-message.schema";

export class ChatMessageRepository implements SaveMessage {
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
}
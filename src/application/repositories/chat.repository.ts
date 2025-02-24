import { DynamoDBClient, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import env from "@main/config/env";

import { SaveChat } from "@domain/gateways/repositories/chat";

import { ChatSchema } from "./schemas/chat.schema";

export class ChatRepository implements SaveChat {
  constructor(
    private readonly client: DynamoDBClient,
  ) {}


  async save(chat: SaveChat.Input): Promise<void> {
    const { participants, ...rest } = chat;

    const chatSchemas: ChatSchema[] = [];

    for (const participant of participants) {
      const chatSchema = new ChatSchema({
        ...rest,
        userId: participant,
        participants
      });

      chatSchemas.push(chatSchema);
    }

    const items = chatSchemas.map(schema => ({
      PutRequest: {
        Item: marshall(schema, {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true,
        })
      }
    }));

    const command = new BatchWriteItemCommand({
      RequestItems: {
        [env.dynamoDBTableName]: items
      }
    });

    await this.client.send(command);
  }
}
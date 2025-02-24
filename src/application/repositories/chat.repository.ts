import { DynamoDBClient, BatchWriteItemCommand, UpdateItemCommand, QueryCommand, QueryCommandOutput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import env from "@application/config/env";

import { SaveChat, UpdateLastMessage } from "@domain/gateways/repositories/chat";
import { Message } from "@domain/entities/message.entity";

import { ChatSchema } from "./schemas/chat.schema";

export class ChatRepository implements SaveChat, UpdateLastMessage {
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

  async updateLastMessage(message: Message): Promise<void> {
    const { chatId, content, createdAt } = message;

    const queryParams = {
      TableName: env.dynamoDBTableName,
      IndexName: "GSI2",
      KeyConditionExpression: "GSI2PK = :gsi2pk AND begins_with(GSI2SK, :gsi2skPrefix)",
      ExpressionAttributeValues: {
        ":gsi2pk": { S: ChatSchema.buildGSI2PK(chatId) },
        ":gsi2skPrefix": { S: "LAST_MESSAGE_DATE#" }
      }
    };

    let items: Record<string, AttributeValue>[] = [];
    let LastEvaluatedKey;
    do {
      const result: QueryCommandOutput = await this.client.send(new QueryCommand({
        ...queryParams,
        ExclusiveStartKey: LastEvaluatedKey
      }));

      if (result.Items) {
        items = items.concat(result.Items);
      }
      LastEvaluatedKey = result.LastEvaluatedKey;
    } while (LastEvaluatedKey);

    if (items.length === 0) {
      throw new Error(`Any item found for chatId: ${chatId}`);
    }

    await Promise.all(items.map(async (item) => {
      const unmarshalledItem = unmarshall(item);

      const updateParams = {
        TableName: env.dynamoDBTableName,
        Key: marshall({
          PK: unmarshalledItem.PK,
          SK: unmarshalledItem.SK
        }),
        UpdateExpression:
          "set lastMessage = :content, lastMessageDate = :createdAt, GSI1SK = :gsi1sk, GSI2SK = :gsi2sk",
        ExpressionAttributeValues: marshall({
          ":content": content,
          ":createdAt": createdAt,
          ":gsi1sk": ChatSchema.buildGSI1SK(createdAt),
          ":gsi2sk": ChatSchema.buildGSI2SK(createdAt)
        }, {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true
        })
      };

      await this.client.send(new UpdateItemCommand(updateParams));
    }));
  }
}
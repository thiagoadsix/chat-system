import type { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient as AWSDynamoDBClient, DynamoDB } from "@aws-sdk/client-dynamodb";

import env from "@main/config/env";

export class DynamoDBClient {
  private client: AWSDynamoDBClient;

  constructor() {
    const config: DynamoDBClientConfig = {
      region: env.awsRegion,
      endpoint: env.isLocal === "true" ? "http://host.docker.internal:8000" : undefined,
      credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
      },
    };

    this.client = new AWSDynamoDBClient(config);
  }

  getClient(): AWSDynamoDBClient {
    return this.client;
  }
}


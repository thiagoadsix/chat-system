import { describe, it, expect, afterEach, vi } from 'vitest'
import { DynamoDBClient as AWSDynamoDBClient } from '@aws-sdk/client-dynamodb'

import env from '@application/config/env'
import { DynamoDBClient } from '@application/utils/clients/dynamo-db.client'

vi.mock('@aws-sdk/client-dynamodb', async () => {
  const actual = await import('@aws-sdk/client-dynamodb')
  return {
    ...actual,
    DynamoDBClient: vi.fn().mockImplementation((config) => {
      return { config }
    }),
  }
})

describe('DynamoDBClient Configuration', () => {
  const originalAwsRegion = env.awsRegion
  const originalIsLocal = env.isLocal

  afterEach(() => {
    env.awsRegion = originalAwsRegion
    env.isLocal = originalIsLocal
    vi.clearAllMocks()
  })

  it('should set the endpoint for local environment', () => {
    env.awsRegion = 'us-west-2'
    env.isLocal = "true"

    const dynamoClient = new DynamoDBClient()
    const client = dynamoClient.getClient()

    expect(AWSDynamoDBClient).toHaveBeenCalledWith({
      region: 'us-west-2',
      endpoint: "http://host.docker.internal:8000",
      credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
      },
    })
    expect(client.config.endpoint).toBe("http://host.docker.internal:8000")
  })

  it('should not set an endpoint for non-local environment', () => {
    env.awsRegion = 'us-east-1'
    env.isLocal = "false"

    const dynamoClient = new DynamoDBClient()
    const client = dynamoClient.getClient()

    expect(AWSDynamoDBClient).toHaveBeenCalledWith({
      region: 'us-east-1',
      endpoint: undefined,
      credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
      },
    })
    expect(client.config.endpoint).toBeUndefined()
  })
})

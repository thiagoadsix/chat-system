import { describe, it, expect, beforeEach, vi } from 'vitest'
import amqp from 'amqplib'

import { RabbitMQClient } from '@application/utils/clients/rabbit-mq.client'

const { fakeChannel, fakeConnection } = vi.hoisted(() => {
  const fakeChannel = {
    assertExchange: vi.fn().mockResolvedValue(undefined),
    publish: vi.fn(),
    assertQueue: vi.fn().mockResolvedValue(undefined),
    bindQueue: vi.fn().mockResolvedValue(undefined),
    consume: vi.fn().mockResolvedValue(undefined),
    ack: vi.fn(),
  }
  const fakeConnection = {
    createChannel: vi.fn().mockResolvedValue(fakeChannel),
  }
  return { fakeChannel, fakeConnection }
})

vi.mock('amqplib', () => {
  return {
    __esModule: true,
    default: {
      connect: vi.fn().mockResolvedValue(fakeConnection),
    },
  }
})

describe('RabbitMQClient', () => {
  let client: RabbitMQClient

  beforeEach(() => {
    client = new RabbitMQClient()
    vi.clearAllMocks()
  })

  it('should connect and set up the exchange', async () => {
    await client.connect()
    expect(amqp.connect).toHaveBeenCalledWith({
      hostname: 'rabbitmq',
      port: 5672,
      username: 'admin',
      password: 'admin',
    })
    expect(fakeConnection.createChannel).toHaveBeenCalled()
    expect(fakeChannel.assertExchange).toHaveBeenCalledWith(
      'chat_messages_exchange',
      'direct',
      { durable: true }
    )
  })

  it('should publish a chat event', async () => {
    const event = { action: 'testAction', data: 'someData' }
    await client.publishChatEvent(event)
    expect(fakeChannel.publish).toHaveBeenCalled()
    const publishCallArgs = fakeChannel.publish.mock.calls[0]
    expect(publishCallArgs[0]).toBe('chat_messages_exchange')
    expect(publishCallArgs[1]).toBe(event.action)
    const msgBuffer = publishCallArgs[2]
    expect(JSON.parse(msgBuffer.toString())).toEqual(event)
    expect(publishCallArgs[3]).toEqual({ persistent: true })
  })

  it('should consume a chat event and process the message', async () => {
    const queue = 'testQueue'
    const action = 'testAction'
    const messageContent = { message: 'hello' }
    const fakeMsg = {
      content: Buffer.from(JSON.stringify(messageContent)),
    }
    fakeChannel.consume.mockImplementationOnce((q, cb, opts) => {
      cb(fakeMsg)
      return Promise.resolve()
    })

    const callback = vi.fn()
    await client.consumeChatEvent(queue, action, callback)
    expect(fakeChannel.assertQueue).toHaveBeenCalledWith(queue, { durable: true })
    expect(fakeChannel.bindQueue).toHaveBeenCalledWith(queue, 'chat_messages_exchange', action)
    expect(callback).toHaveBeenCalledWith(messageContent)
    expect(fakeChannel.ack).toHaveBeenCalledWith(fakeMsg)
  })
})

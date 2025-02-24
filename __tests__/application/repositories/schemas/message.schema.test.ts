import { describe, it, expect } from 'vitest'

import { Message } from '@domain/entities'

import { MessageSchema } from '@application/repositories/schemas/message.schema'

describe('MessageSchema', () => {
  const properties = {
    id: 1,
    chatId: 'chat1',
    sender: 'user1',
    content: 'Hello world!',
    createdAt: 1630000000000,
    replyTo: 0,
    edited: false,
  }

  it('should compute PK, SK, GSI1PK and GSI1SK correctly in the constructor', () => {
    const schema = new MessageSchema(properties)
    expect(schema.PK).toBe(`CHAT#${properties.chatId}`)
    expect(schema.SK).toBe(`MESSAGE#${properties.id}`)
    expect(schema.GSI1PK).toBe(`USER#${properties.sender}`)
    expect(schema.GSI1SK).toBe(`CHAT#${properties.chatId}`)
  })

  it('should convert to a Message entity using toEntity()', () => {
    const schema = new MessageSchema(properties)
    const entity = schema.toEntity()
    // Compare properties to ensure conversion is correct.
    expect(entity.id).toBe(properties.id)
    expect(entity.chatId).toBe(properties.chatId)
    expect(entity.sender).toBe(properties.sender)
    expect(entity.content).toBe(properties.content)
    expect(entity.createdAt).toBe(properties.createdAt)
    expect(entity.replyTo).toBe(properties.replyTo)
    expect(entity.edited).toBe(properties.edited)
  })

  it('should create a MessageSchema from a Message entity using fromEntity()', () => {
    const entity = new Message({
      id: properties.id,
      chatId: properties.chatId,
      sender: properties.sender,
      content: properties.content,
      createdAt: properties.createdAt,
      replyTo: properties.replyTo,
      edited: properties.edited,
    })
    const schema = MessageSchema.fromEntity(entity)
    expect(schema.id).toBe(entity.id)
    expect(schema.chatId).toBe(entity.chatId)
    expect(schema.sender).toBe(entity.sender)
    expect(schema.content).toBe(entity.content)
    expect(schema.createdAt).toBe(entity.createdAt)
    expect(schema.replyTo).toBe(entity.replyTo)
    expect(schema.edited).toBe(entity.edited)
  })

  it('should create a MessageSchema from an unmarshalled item', () => {
    const item = { ...properties }
    const schema = MessageSchema.fromUnmarshalledItem(item)
    expect(schema.id).toBe(item.id)
    expect(schema.chatId).toBe(item.chatId)
    expect(schema.sender).toBe(item.sender)
    expect(schema.content).toBe(item.content)
    expect(schema.createdAt).toBe(item.createdAt)
    expect(schema.replyTo).toBe(item.replyTo)
    expect(schema.edited).toBe(item.edited)
  })

  it('should build partition and sort keys correctly using static methods', () => {
    const pk = MessageSchema.buildPK(properties.chatId)
    const sk = MessageSchema.buildSK(properties.id)
    const gsi1pk = MessageSchema.buildGSI1PK(properties.sender)
    const gsi1sk = MessageSchema.buildGSI1SK(properties.chatId)
    expect(pk).toBe(`CHAT#${properties.chatId}`)
    expect(sk).toBe(`MESSAGE#${properties.id}`)
    expect(gsi1pk).toBe(`USER#${properties.sender}`)
    expect(gsi1sk).toBe(`CHAT#${properties.chatId}`)
  })
})

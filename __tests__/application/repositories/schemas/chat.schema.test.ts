import { describe, it, expect } from 'vitest'
import { Chat } from '@domain/entities/chat.entity'

import { ChatSchema } from '@application/repositories/schemas/chat.schema'

describe('ChatSchema', () => {
  const properties = {
    id: 'chat123',
    userId: 'user456',
    participants: ['user1', 'user2'],
    lastMessage: 'Hello there!',
    lastMessageDate: 1650000000000,
    createdAt: 1640000000000,
    updatedAt: 1640000005000,
  }

  it('should compute PK, SK, GSI1PK, GSI1SK, GSI2PK, and GSI2SK correctly in the constructor', () => {
    const schema = new ChatSchema(properties)
    expect(schema.PK).toBe(`USER_ID#${properties.userId}`)
    expect(schema.SK).toBe(`CHAT#${properties.id}`)
    expect(schema.GSI1PK).toBe(`USER_ID#${properties.userId}`)
    expect(schema.GSI1SK).toBe(`LAST_MESSAGE_DATE#${properties.lastMessageDate}`)
    expect(schema.GSI2PK).toBe(`CHAT#${properties.id}`)
    expect(schema.GSI2SK).toBe(`LAST_MESSAGE_DATE#${properties.lastMessageDate}`)
  })

  it('should convert to a Chat entity using toEntity()', () => {
    const schema = new ChatSchema(properties)
    const entity = schema.toEntity()
    expect(entity.id).toBe(properties.id)
    expect(entity.userId).toBe(properties.userId)
    expect(entity.participants).toEqual(properties.participants)
    expect(entity.lastMessage).toBe(properties.lastMessage)
    expect(entity.lastMessageDate).toBe(properties.lastMessageDate)
    expect(entity.createdAt).toBe(properties.createdAt)
  })

  it('should create a ChatSchema from a Chat entity using fromEntity()', () => {
    const chatEntity = new Chat({
      id: properties.id,
      userId: properties.userId,
      participants: properties.participants,
      lastMessage: properties.lastMessage,
      lastMessageDate: properties.lastMessageDate,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    })
    const schema = ChatSchema.fromEntity(chatEntity)
    expect(schema.id).toBe(chatEntity.id)
    expect(schema.userId).toBe(chatEntity.userId)
    expect(schema.participants).toEqual(chatEntity.participants)
    expect(schema.lastMessage).toBe(chatEntity.lastMessage)
    expect(schema.lastMessageDate).toBe(chatEntity.lastMessageDate)
    expect(schema.createdAt).toBe(chatEntity.createdAt)
    expect(schema.updatedAt).toBe(chatEntity.updatedAt)
  })

  it('should default fallback values in fromEntity when provided fields are falsy', () => {
    // Create a Chat entity with falsy values for userId, lastMessage, and lastMessageDate.
    const chatEntityWithFalsy = new Chat({
      id: 'chatTest',
      userId: '',            // Falsy, should default to ""
      participants: ['user1'],
      lastMessage: '',       // Falsy, should default to undefined
      lastMessageDate: 0,    // Falsy, should default to undefined
      createdAt: 123456789,
      updatedAt: 123456789,
    })
    const schema = ChatSchema.fromEntity(chatEntityWithFalsy)
    // Verify fallback for userId.
    expect(schema.userId).toBe("")
    // Verify fallback for lastMessage and lastMessageDate.
    expect(schema.lastMessage).toBeUndefined()
    expect(schema.lastMessageDate).toBeUndefined()
  })

  it('should create a ChatSchema from an unmarshalled item using fromUnmarshalledItem()', () => {
    const item = { ...properties }
    const schema = ChatSchema.fromUnmarshalledItem(item)
    expect(schema.id).toBe(item.id)
    expect(schema.userId).toBe(item.userId)
    expect(schema.participants).toEqual(item.participants)
    expect(schema.lastMessage).toBe(item.lastMessage)
    expect(schema.lastMessageDate).toBe(item.lastMessageDate)
    expect(schema.createdAt).toBe(item.createdAt)
    expect(schema.updatedAt).toBe(item.updatedAt)
  })

  it('should build keys correctly using static builder methods', () => {
    expect(ChatSchema.buildPK(properties.userId)).toBe(`USER_ID#${properties.userId}`)
    expect(ChatSchema.buildSK(properties.id)).toBe(`CHAT#${properties.id}`)
    expect(ChatSchema.buildGSI1PK(properties.userId)).toBe(`USER_ID#${properties.userId}`)
    expect(ChatSchema.buildGSI1SK(properties.lastMessageDate)).toBe(`LAST_MESSAGE_DATE#${properties.lastMessageDate}`)
    expect(ChatSchema.buildGSI2PK(properties.id)).toBe(`CHAT#${properties.id}`)
    expect(ChatSchema.buildGSI2SK(properties.lastMessageDate)).toBe(`LAST_MESSAGE_DATE#${properties.lastMessageDate}`)
  })
})

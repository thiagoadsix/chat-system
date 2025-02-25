import { describe, it, expect, beforeEach, vi } from 'vitest'

import { RabbitMQClient } from '@application/utils/clients/rabbit-mq.client'
import { ChatMessageProcessor } from '@application/services/chat-message.processor'
import { MessageRepository } from '@application/repositories/message.repository'
import { ChatRepository } from '@application/repositories/chat.repository'

const fakeMessage = {
  id: '123',
  chatId: '456',
  sender: 'user1',
  content: 'hello'
}

describe('ChatMessageProcessor', () => {
  let rabbitMQClientMock: Partial<RabbitMQClient>
  let messageRepositoryMock: Partial<MessageRepository>
  let chatRepositoryMock: Partial<ChatRepository>
  let processor: ChatMessageProcessor

  beforeEach(() => {
    rabbitMQClientMock = {
      consumeChatEvent: vi.fn().mockImplementation((queue: string, action: string, callback: (msg: { action: string, message: typeof fakeMessage }) => void) => {
        return callback({ action, message: fakeMessage })
      })
    }
    messageRepositoryMock = {
      save: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined)
    }
    chatRepositoryMock = {
      updateLastMessage: vi.fn().mockResolvedValue(undefined)
    }

    processor = new ChatMessageProcessor(
      rabbitMQClientMock as RabbitMQClient,
      messageRepositoryMock as MessageRepository,
      chatRepositoryMock as ChatRepository
    )
  })

  it('should process "send" action', async () => {
    await processor.processMessage('send')
    expect(rabbitMQClientMock.consumeChatEvent).toHaveBeenCalledWith('chat_messages_send', 'send', expect.any(Function))
    expect(messageRepositoryMock.save).toHaveBeenCalledWith(fakeMessage)
    expect(chatRepositoryMock.updateLastMessage).toHaveBeenCalledWith(fakeMessage)
  })

  it('should process "delete" action', async () => {
    await processor.processMessage('delete')
    expect(rabbitMQClientMock.consumeChatEvent).toHaveBeenCalledWith('chat_messages_delete', 'delete', expect.any(Function))
    expect(messageRepositoryMock.delete).toHaveBeenCalledWith({
      id: fakeMessage.id,
      chatId: fakeMessage.chatId,
      sender: fakeMessage.sender,
    })
  })

  it('should process "update" action', async () => {
    await processor.processMessage('update')
    expect(rabbitMQClientMock.consumeChatEvent).toHaveBeenCalledWith('chat_messages_update', 'update', expect.any(Function))
    expect(messageRepositoryMock.update).toHaveBeenCalledWith(fakeMessage)
  })

  it('should process "reply" action', async () => {
    await processor.processMessage('reply')
    expect(rabbitMQClientMock.consumeChatEvent).toHaveBeenCalledWith('chat_messages_reply', 'reply', expect.any(Function))
    expect(messageRepositoryMock.save).toHaveBeenCalledWith(fakeMessage)
  })

  it('should warn for an unhandled action', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const unhandledAction = 'unknown'
    await processor.processMessage(unhandledAction)
    expect(rabbitMQClientMock.consumeChatEvent).toHaveBeenCalledWith(`chat_messages_${unhandledAction}`, unhandledAction, expect.any(Function))
    expect(consoleWarnSpy).toHaveBeenCalledWith(`Unhandled action: ${unhandledAction}`)
    expect(messageRepositoryMock.save).not.toHaveBeenCalled()
    expect(messageRepositoryMock.delete).not.toHaveBeenCalled()
    expect(messageRepositoryMock.update).not.toHaveBeenCalled()
    expect(chatRepositoryMock.updateLastMessage).not.toHaveBeenCalled()
    consoleWarnSpy.mockRestore()
  })
})

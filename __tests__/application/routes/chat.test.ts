import { describe, it, expect, vi } from 'vitest'
import type { FastifyInstance } from 'fastify'

import registerRoutes from '@application/routes/chat'

describe('Routes Registration', () => {
  it('should register the routes with correct HTTP methods, paths, and options', async () => {
    const postMock = vi.fn()
    const deleteMock = vi.fn()
    const patchMock = vi.fn()

    const fakeApp = {
      post: postMock,
      delete: deleteMock,
      patch: patchMock,
    } as unknown as FastifyInstance

    await registerRoutes(fakeApp)

    expect(postMock).toHaveBeenCalledTimes(3)
    expect(deleteMock).toHaveBeenCalledTimes(1)
    expect(patchMock).toHaveBeenCalledTimes(1)

    expect(postMock).toHaveBeenNthCalledWith(
      1,
      '/chats',
      expect.objectContaining({
        preHandler: expect.arrayContaining([expect.any(Function)])
      }),
      expect.any(Function)
    )

    expect(postMock).toHaveBeenNthCalledWith(
      2,
      '/chats/:chatId/messages',
      expect.objectContaining({
        preHandler: expect.arrayContaining([expect.any(Function)])
      }),
      expect.any(Function)
    )

    expect(postMock).toHaveBeenNthCalledWith(
      3,
      '/chats/:chatId/messages/:messageId/replies',
      expect.objectContaining({
        preHandler: expect.arrayContaining([expect.any(Function)])
      }),
      expect.any(Function)
    )

    expect(deleteMock).toHaveBeenCalledWith(
      '/chats/:chatId/messages/:messageId',
      expect.objectContaining({
        preHandler: expect.arrayContaining([expect.any(Function)])
      }),
      expect.any(Function)
    )

    expect(patchMock).toHaveBeenCalledWith(
      '/chats/:chatId/messages/:messageId',
      expect.objectContaining({
        preHandler: expect.arrayContaining([expect.any(Function)])
      }),
      expect.any(Function)
    )
  })
})

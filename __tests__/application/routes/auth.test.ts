import { describe, it, expect, vi } from 'vitest'
import type { FastifyInstance } from 'fastify'
import registerAuthRoutes from '@application/routes/auth'

describe('Auth Routes Registration', () => {
  it('should register POST /auth/sign-up and /auth/sign-in routes', async () => {
    const postMock = vi.fn()
    const fakeApp = {
      post: postMock,
    } as unknown as FastifyInstance

    await registerAuthRoutes(fakeApp)

    expect(postMock).toHaveBeenCalledTimes(2)
    expect(postMock).toHaveBeenNthCalledWith(1, '/auth/sign-up', expect.any(Function))
    expect(postMock).toHaveBeenNthCalledWith(2, '/auth/sign-in', expect.any(Function))
  })
})

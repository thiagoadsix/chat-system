import { describe, it, expect, vi } from 'vitest'

import { authMiddleware } from '@application/middleware/auth.middleware'

describe('authMiddleware', () => {
  it('should call jwtVerify successfully and not send an error response', async () => {
    const jwtVerifyMock = vi.fn().mockResolvedValue(undefined)
    const request = { jwtVerify: jwtVerifyMock } as any

    const sendMock = vi.fn()
    const statusMock = vi.fn().mockReturnValue({ send: sendMock })
    const reply = { status: statusMock } as any

    await authMiddleware(request, reply)

    expect(jwtVerifyMock).toHaveBeenCalled()

    expect(statusMock).not.toHaveBeenCalled()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('should send a 401 error response when jwtVerify fails', async () => {
    const jwtVerifyMock = vi.fn().mockRejectedValue(new Error('Invalid token'))
    const request = { jwtVerify: jwtVerifyMock } as any

    const sendMock = vi.fn()
    const statusMock = vi.fn().mockReturnValue({ send: sendMock })
    const reply = { status: statusMock } as any

    await authMiddleware(request, reply)

    expect(jwtVerifyMock).toHaveBeenCalled()
    expect(statusMock).toHaveBeenCalledWith(401)
    expect(sendMock).toHaveBeenCalledWith({ error: 'Not authorized' })
  })
})

import { describe, it, expect, vi } from 'vitest'
import type { FastifyRequest, FastifyReply } from 'fastify'

import type { Controller, HttpResponse } from '@presentation/protocols'
import { adaptRoute } from '@application/adapters/fastify-routes.adapter'

describe('adaptRoute', () => {
  it('should call controller.handle with the correct httpRequest and send a successful response', async () => {
    const fakeController: Controller = {
      handle: vi.fn().mockResolvedValue({
        statusCode: 200,
        body: { success: true }
      } as HttpResponse)
    }

    const req = {
      body: { foo: 'bar' },
      params: { id: '123' }
    } as FastifyRequest

    const send = vi.fn()
    const status = vi.fn().mockReturnValue({ send })
    const res = { status } as unknown as FastifyReply

    const routeHandler = adaptRoute(fakeController)
    await routeHandler(req, res)

    expect(fakeController.handle).toHaveBeenCalledWith({
      body: req.body,
      params: req.params
    })
    expect(status).toHaveBeenCalledWith(200)
    expect(send).toHaveBeenCalledWith({ success: true })
  })

  it('should call controller.handle with the correct httpRequest and send an error response', async () => {
    const fakeError = new Error('Test error')
    fakeError.stack = 'stacktrace'
    const fakeController: Controller = {
      handle: vi.fn().mockResolvedValue({
        statusCode: 400,
        body: fakeError
      } as HttpResponse)
    }

    const req = {
      body: { foo: 'bar' },
      params: { id: '123' }
    } as FastifyRequest

    const send = vi.fn()
    const status = vi.fn().mockReturnValue({ send })
    const res = { status } as unknown as FastifyReply

    const routeHandler = adaptRoute(fakeController)
    await routeHandler(req, res)

    expect(fakeController.handle).toHaveBeenCalledWith({
      body: req.body,
      params: req.params
    })
    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith({
      error: {
        message: fakeError.message,
        name: fakeError.name,
        stack: fakeError.stack
      }
    })
  })
})

import { describe, it, expect, vi } from 'vitest'
import autoLoad from '@fastify/autoload'

import autoloadRoutes from '@application/config/routes'

describe('autoloadRoutes', () => {
  it('should register autoLoad with the correct options', () => {
    const fakeApp = {
      register: vi.fn(),
    }
    autoloadRoutes(fakeApp as any)

    expect(fakeApp.register).toHaveBeenCalledTimes(1)

    const [plugin, opts] = fakeApp.register.mock.calls[0]

    expect(plugin).toBe(autoLoad)
    expect(opts).toHaveProperty('dir')
    expect(typeof opts.dir).toBe('string')
    expect(opts.dir).toContain('routes')
    expect(opts).toHaveProperty('options')
    expect(opts.options).toEqual({ prefix: '/api' })
  })
})

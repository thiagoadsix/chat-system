import { describe, it, expect } from 'vitest'

import { User } from '@domain/entities'

describe('User', () => {
  it('should instantiate an user', () => {
    const userProps = { username: 'testuser', password: 'testpass' }
    const user = new User(userProps)

    expect(user.username).toBe('testuser')
    expect(user.password).toBe('testpass')
  })
})

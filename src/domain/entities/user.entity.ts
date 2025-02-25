import { randomUUID as uuid } from 'crypto'

export interface UserProperties {
  id?: string
  username: string
  password: string
}

export class User {
  id: string
  username: string
  password: string

  constructor(properties: UserProperties) {
    this.id = properties.id || uuid()
    this.username = properties.username
    this.password = properties.password
  }
}

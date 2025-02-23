import { randomUUID as uuid } from 'crypto';

export interface ChatProperties {
  id: string;
  userIds: string[];
  title?: string;
  createdAt?: number;
  updatedAt?: number;
}

export class Chat implements ChatProperties {
  id: string;
  userIds: string[];
  title?: string;
  createdAt?: number;
  updatedAt?: number;

  constructor(properties: ChatProperties) {
    this.id = properties.id || uuid();
    this.userIds = properties.userIds;
    this.title = properties.title;
    this.createdAt = properties.createdAt || Date.now();
  }

  refreshUpdatedAt() {
    this.updatedAt = Date.now();
  }
}

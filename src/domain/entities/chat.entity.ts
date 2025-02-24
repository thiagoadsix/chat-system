import { randomUUID as uuid } from 'crypto';

export interface ChatProperties {
  id?: string;
  participants: string[];
  lastMessage?: string;
  lastMessageDate?: number;
  createdAt?: number;
  updatedAt?: number;
}

export class Chat implements ChatProperties {
  id: string;
  participants: string[];
  createdAt?: number;
  updatedAt?: number;

  constructor(properties: ChatProperties) {
    this.id = properties.id || uuid();
    this.participants = properties.participants;
    this.createdAt = properties.createdAt || Date.now();
  }

  refreshUpdatedAt() {
    this.updatedAt = Date.now();
  }
}

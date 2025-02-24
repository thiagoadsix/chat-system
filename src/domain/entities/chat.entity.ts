import { randomUUID as uuid } from 'crypto';

export interface ChatProperties {
  id?: string;
  userId: string;
  participants: string[];
  lastMessage?: string;
  lastMessageDate?: number;
  createdAt?: number;
  updatedAt?: number;
}

export class Chat implements ChatProperties {
  id: string;
  userId: string;
  participants: string[];
  lastMessage?: string;
  lastMessageDate?: number;
  createdAt?: number;
  updatedAt?: number;

  constructor(properties: ChatProperties) {
    this.id = properties.id || uuid();
    this.userId = properties.userId;
    this.participants = properties.participants;
    this.createdAt = properties.createdAt || Date.now();
    this.lastMessage = properties.lastMessage;
    this.lastMessageDate = properties.lastMessageDate;
  }

  refreshUpdatedAt() {
    this.updatedAt = Date.now();
  }
}

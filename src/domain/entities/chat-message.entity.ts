import { randomUUID as uuid } from 'crypto';

export interface ChatMessageProperties {
  id?: string;
  userId: string;
  content: string;
  replyTo?: string;
  createdAt?: number;
  updatedAt?: number;
}

export class ChatMessage implements ChatMessageProperties {
  id: string;
  userId: string;
  content: string;
  replyTo?: string;
  createdAt: number;
  updatedAt?: number;

  constructor(
    properties: ChatMessageProperties,
  ) {
    this.id = properties.id || uuid();
    this.userId = properties.userId;
    this.content = properties.content;
    this.replyTo = properties.replyTo;
    this.createdAt = properties.createdAt || Date.now();
  }

  refreshUpdatedAt() {
    this.updatedAt = Date.now();
  }
}
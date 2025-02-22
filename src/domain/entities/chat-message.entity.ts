import { randomUUID as uuid } from 'crypto';

export interface ChatMessageProperties {
  id?: string;
  userId: string;
  content: string;
  createdAt?: number;
  replyTo?: string;
}

export class ChatMessage implements ChatMessageProperties {
  id: string;
  userId: string;
  content: string;
  createdAt: number;
  replyTo?: string;

  constructor(
    properties: ChatMessageProperties,
  ) {
    this.id = properties.id || uuid();
    this.userId = properties.userId;
    this.content = properties.content;
    this.createdAt = properties.createdAt || Date.now();
    this.replyTo = properties.replyTo;
  }
}
export interface MessageProperties {
  id?: number;
  chatId: string;
  sender: string;
  content: string;
  edited?: boolean;
  replyTo?: string;
  createdAt?: number;
  updatedAt?: number;
}

export class Message implements MessageProperties {
  id: number;
  chatId: string;
  sender: string;
  content: string;
  edited?: boolean;
  replyTo?: string;
  createdAt: number;
  updatedAt?: number;

  constructor(
    properties: MessageProperties,
  ) {
    this.id = properties.id || Date.now();
    this.chatId = properties.chatId;
    this.sender = properties.sender;
    this.content = properties.content;
    this.replyTo = properties.replyTo;
    this.edited = properties.edited || false;
    this.createdAt = properties.createdAt || Date.now();
    this.updatedAt = properties.updatedAt
  }

  refreshUpdatedAt() {
    this.updatedAt = Date.now();
  }
}
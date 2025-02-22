import { ChatMessage } from "@domain/entities/chat-message.entity";

export interface ChatMessageSchemaProperties {
  messageId: string;
  userId: string;
  content: string;
  replyTo?: string;
  createdAt: number;
}

export class ChatMessageSchema
  implements ChatMessageSchemaProperties
{
  /** CHAT#{userId} */
  readonly PK: string;
  /** MESSAGE#{messageId} */
  readonly SK: string;

  messageId: string;
  userId: string;
  content: string;
  replyTo?: string;
  createdAt: number;

  constructor(properties: ChatMessageSchemaProperties) {
    this.messageId = properties.messageId;
    this.userId = properties.userId;
    this.content = properties.content;
    this.replyTo = properties.replyTo;
    this.createdAt = properties.createdAt;

    this.PK = ChatMessageSchema.buildPK(
      this.userId
    );
    this.SK = ChatMessageSchema.buildSK(
      this.messageId
    );
  }

  toEntity(): ChatMessage {
    return new ChatMessage({
      messageId: this.messageId,
      userId: this.userId,
      content: this.content,
      replyTo: this.replyTo,
      createdAt: this.createdAt
    });
  }

  static fromEntity(
    entity: ChatMessage
  ): ChatMessageSchema {
    return new ChatMessageSchema({
      messageId: entity.messageId,
      userId: entity.userId,
      content: entity.content,
      replyTo: entity.replyTo,
      createdAt: entity.createdAt
    });
  }

  static fromUnmarshalledItem(
    item: Record<string, any>
  ): ChatMessageSchema {
    return new ChatMessageSchema({
      messageId: item.messageId,
      userId: item.userId,
      content: item.content,
      replyTo: item.replyTo,
      createdAt: item.createdAt
    });
  }

  static buildPK(userId: string): string {
    return `CHAT#${userId}`;
  }

  static buildSK(messageId: string): string {
    return `MESSAGE#${messageId}`;
  }
}

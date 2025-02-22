import { ChatMessage } from "@domain/entities/chat-message.entity";

export interface ChatMessageSchemaProperties {
  id: string;
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
  /** MESSAGE#{id} */
  readonly SK: string;

  id: string;
  userId: string;
  content: string;
  replyTo?: string;
  createdAt: number;

  constructor(properties: ChatMessageSchemaProperties) {
    this.id = properties.id;
    this.userId = properties.userId;
    this.content = properties.content;
    this.replyTo = properties.replyTo;
    this.createdAt = properties.createdAt;

    this.PK = ChatMessageSchema.buildPK(
      this.userId
    );
    this.SK = ChatMessageSchema.buildSK(
      this.id
    );
  }

  toEntity(): ChatMessage {
    return new ChatMessage({
      id: this.id,
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
      id: entity.id,
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
      id: item.id,
      userId: item.userId,
      content: item.content,
      replyTo: item.replyTo,
      createdAt: item.createdAt
    });
  }

  static buildPK(userId: string): string {
    return `CHAT#${userId}`;
  }

  static buildSK(id: string): string {
    return `MESSAGE#${id}`;
  }
}

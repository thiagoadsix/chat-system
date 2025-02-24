import { Chat } from "@domain/entities/chat.entity";

export interface ChatSchemaProperties {
  id: string;
  userId: string;
  participants: string[];
  lastMessage?: string;
  lastMessageDate?: number;
  createdAt?: number;
  updatedAt?: number;
}

export class ChatSchema {
  /** USER_ID#userId */
  readonly PK: string;
  /** CHAT#id */
  readonly SK: string;

  /** USER_ID#userId */
  readonly GSI1PK: string;
  /** LAST_MESSAGE_DATE#lastMessageDate */
  readonly GSI1SK: string;

  /** CHAT#id */
  readonly GSI2PK: string;
  /** LAST_MESSAGE_DATE#lastMessageDate */
  readonly GSI2SK: string;

  id: string;
  userId: string;
  participants: string[];
  lastMessage?: string;
  lastMessageDate?: number;
  createdAt?: number;
  updatedAt?: number;

  constructor(properties: ChatSchemaProperties) {
    this.id = properties.id;
    this.userId = properties.userId;
    this.participants = properties.participants;
    this.lastMessage = properties.lastMessage;
    this.lastMessageDate = properties.lastMessageDate;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;

    this.PK = ChatSchema.buildPK(properties.userId);
    this.SK = ChatSchema.buildSK(properties.id);
    this.GSI1PK = ChatSchema.buildGSI1PK(properties.userId);
    this.GSI1SK = ChatSchema.buildGSI1SK(properties.lastMessageDate || 0);
    this.GSI2PK = ChatSchema.buildGSI2PK(properties.id);
    this.GSI2SK = ChatSchema.buildGSI2SK(properties.lastMessageDate || 0);
  }

  static buildPK(participantId: string): string {
    return `USER_ID#${participantId}`;
  }

  static buildSK(id: string): string {
    return `CHAT#${id}`;
  }

  static buildGSI1PK(participantId: string): string {
    return `USER_ID#${participantId}`;
  }

  static buildGSI1SK(lastMessageDate: number): string {
    return `LAST_MESSAGE_DATE#${lastMessageDate}`;
  }

  static buildGSI2PK(id: string): string {
    return `CHAT#${id}`;
  }

  static buildGSI2SK(lastMessageDate: number): string {
    return `LAST_MESSAGE_DATE#${lastMessageDate}`;
  }

  toEntity(): Chat {
    return new Chat({
      id: this.id,
      userId: this.userId,
      participants: this.participants,
      lastMessage: this.lastMessage,
      lastMessageDate: this.lastMessageDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    });
  }

  static fromEntity(
    entity: Chat
  ): ChatSchema {
    return new ChatSchema({
      id: entity.id,
      userId: entity.userId || "",
      participants: entity.participants,
      lastMessage: entity.lastMessage || undefined,
      lastMessageDate: entity.lastMessageDate || undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    });
  }

  static fromUnmarshalledItem(
    item: Record<string, any>
  ): ChatSchema {
    return new ChatSchema({
      id: item.id,
      userId: item.userId,
      participants: item.participants,
      lastMessage: item.lastMessage,
      lastMessageDate: item.lastMessageDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    });
  }
}
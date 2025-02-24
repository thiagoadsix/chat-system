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
  readonly GS1PK: string;
  /** LAST_MESSAGE_DATE#lastMessageDate */
  readonly GS1SK: string;

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
    this.GS1PK = ChatSchema.buildGS1PK(properties.userId);
    this.GS1SK = ChatSchema.buildGS1SK(properties.lastMessageDate || 0);
  }

  static buildPK(participantId: string): string {
    return `USER_ID#${participantId}`;
  }

  static buildSK(id: string): string {
    return `CHAT#${id}`;
  }

  static buildGS1PK(participantId: string): string {
    return `USER_ID#${participantId}`;
  }

  static buildGS1SK(lastMessageDate: number): string {
    return `LAST_MESSAGE_DATE#${lastMessageDate}`;
  }
}
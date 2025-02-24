import { Message } from "@domain/entities";

export interface MessageSchemaProperties {
  id: number;
  chatId: string;
  sender: string;
  content: string;
  createdAt: number;
  replyTo?: number;
  edited?: boolean;
}

export class MessageSchema
  implements MessageSchemaProperties
{
  /** CHAT#{chatId} */
  readonly PK: string;
  /** MESSAGE#{id} */
  readonly SK: string;

  /** USER#{sender} */
  readonly GSI1PK: string;
  /** CHAT#{id} */
  readonly GSI1SK: string;

  id: number;
  chatId: string;
  sender: string;
  content: string;
  replyTo?: number;
  createdAt: number;
  edited?: boolean;

  constructor(properties: MessageSchemaProperties) {
    this.id = properties.id;
    this.chatId = properties.chatId;
    this.sender = properties.sender;
    this.content = properties.content;
    this.replyTo = properties.replyTo;
    this.createdAt = properties.createdAt;
    this.edited = properties.edited;

    this.PK = MessageSchema.buildPK(
      this.chatId
    );
    this.SK = MessageSchema.buildSK(
      this.id
    );

    this.GSI1PK = MessageSchema.buildGSI1PK(
      this.sender
    );
    this.GSI1SK = MessageSchema.buildGSI1SK(
      this.chatId
    )
  }

  toEntity(): Message {
    return new Message({
      id: this.id,
      chatId: this.chatId,
      sender: this.sender,
      content: this.content,
      replyTo: this.replyTo,
      createdAt: this.createdAt,
      edited: this.edited
    });
  }

  static fromEntity(
    entity: Message
  ): MessageSchema {
    return new MessageSchema({
      id: entity.id,
      chatId: entity.chatId,
      sender: entity.sender,
      content: entity.content,
      replyTo: entity.replyTo,
      createdAt: entity.createdAt,
      edited: entity.edited
    });
  }

  static fromUnmarshalledItem(
    item: Record<string, any>
  ): MessageSchema {
    return new MessageSchema({
      id: item.id,
      chatId: item.chatId,
      sender: item.sender,
      content: item.content,
      replyTo: item.replyTo,
      createdAt: item.createdAt,
      edited: item.edited
    });
  }

  static buildPK(userId: string): string {
    return `CHAT#${userId}`;
  }

  static buildSK(id: number): string {
    return `MESSAGE#${id}`;
  }

  static buildGSI1PK(userId: string): string {
    return `USER#${userId}`;
  }

  static buildGSI1SK(chatId: string): string {
    return `CHAT#${chatId}`;
  }
}

import { Message as MessagePrisma, MessageStatus as MessageStatusPrisma } from '@prisma/client';
import { EntityId } from '../../../shared/core/domain/entity-id';
import { Message } from '../domain/message.entity';
import { MessageDTO } from '../dtos/message.dto';
import { MessageStatusMapper } from './message-status.mapper';

export class MessageMapper {
  public static toPersistence(message: Message): MessagePrisma {
    return {
      id: message.id.toValue(),
      created_at: message.createdAt,
      content: message.content,
    };
  }

  public static toDomain(raw: MessagePrisma, statuses: MessageStatusPrisma[]): Message {
    return Message.create(
      {
        content: raw.content,
        createdAt: raw.created_at,
        statuses: statuses?.map(MessageStatusMapper.toDomain),
      },
      new EntityId(raw.id),
    );
  }

  public static toDTO(message: Message): MessageDTO {
    return {
      id: message.id.toValue(),
      content: message.content,
      createdAt: message.createdAt?.toISOString(),
      statuses: message.statuses?.map(MessageStatusMapper.toDTO),
    };
  }
}

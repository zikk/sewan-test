import { Message as MessagePrisma } from '@prisma/client';
import { EntityId } from 'src/shared/core/domain/entity-id';
import { Message } from '../domain/message.entity';
import { MessageDTO } from '../dtos/message.dto';

export class MessageMapper {
  public static toPersistence(message: Message): Record<string, any> {
    return {
      id: message.id.toValue,
      message: message.content,
    };
  }

  public static toDomain(raw: MessagePrisma): Message {
    return Message.create(
      {
        content: raw.content,
        createdAt: raw.createdAt,
      },
      new EntityId(raw.id),
    );
  }

  public static toDTO(message: Message): MessageDTO {
    return {
      id: message.id.toValue(),
      content: message.content,
    };
  }
}

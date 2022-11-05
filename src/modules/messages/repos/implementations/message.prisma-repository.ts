import { PrismaClient } from '@prisma/client';
import { EntityId } from '../../../../shared/core/domain/entity-id';
import { MessageStatus } from '../../domain/message-status.entity';
import { Message } from '../../domain/message.entity';
import { MessageStatusMapper } from '../../mappers/message-status.mapper';
import { MessageMapper } from '../../mappers/message.mapper';
import { MessageRepository } from '../message.repository';

export class MessagePrismaRepository implements MessageRepository {
  private database: { prisma: PrismaClient };

  constructor(database: any) {
    this.database = database;
  }

  async exists(id: EntityId): Promise<boolean> {
    const rawMessage = await this.database.prisma.message.findUnique({
      where: {
        id: id.toValue(),
      },
    });

    return !!rawMessage;
  }

  async get(id: EntityId): Promise<Message | null> {
    const rawMessage = await this.database.prisma.message.findUnique({
      where: {
        id: id.toValue(),
      },
      include: {
        statuses: true,
      },
    });

    if (!rawMessage) {
      return null;
    }

    const { statuses, ...message } = rawMessage;

    return MessageMapper.toDomain(message, statuses);
  }

  async getAll(): Promise<Message[]> {
    const rawMessages = await this.database.prisma.message.findMany({
      include: {
        statuses: true,
      },
    });

    return rawMessages.map((rawMessage) => {
      const { statuses, ...message } = rawMessage;

      return MessageMapper.toDomain(message, statuses);
    });
  }

  async save(message: Message): Promise<void> {
    const exists = await this.exists(message.id);
    const rawMessage = MessageMapper.toPersistence(message);

    if (!exists) {
      await this.database.prisma.message.create({
        data: rawMessage,
      });
    } else {
      await this.database.prisma.message.update({
        where: {
          id: message.id.toValue(),
        },
        data: rawMessage,
      });
    }
  }

  async saveStatus(status: MessageStatus): Promise<void> {
    const exists = await this.database.prisma.messageStatus.findUnique({
      where: {
        message_id_target: {
          message_id: status.messageId.toValue(),
          target: status.target.value,
        },
      },
    });

    const rawStatus = MessageStatusMapper.toPersistence(status);

    if (!exists) {
      await this.database.prisma.messageStatus.create({
        data: rawStatus,
      });
    } else {
      await this.database.prisma.messageStatus.update({
        where: {
          message_id_target: {
            message_id: status.messageId.toValue(),
            target: status.target.value,
          },
        },
        data: rawStatus,
      });
    }
  }
}

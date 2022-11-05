import { MessageStatus as MessageStatusPrisma } from '@prisma/client';
import { EntityId } from '../../../shared/core/domain/entity-id';
import { MessageStatus, MessageStatusValue } from '../domain/message-status.entity';
import { MessageTarget, MessageTargetValue } from '../domain/message-target.value-object';
import { MessageStatusDTO } from '../dtos/message.dto';

export class MessageStatusMapper {
  static toDomain(rawMessageStatus: MessageStatusPrisma): MessageStatus {
    return MessageStatus.create({
      messageId: new EntityId(rawMessageStatus.message_id),
      target: MessageTarget.create(rawMessageStatus.target as MessageTargetValue),
      status: rawMessageStatus.status as MessageStatusValue,
      sentAt: rawMessageStatus.sent_at,
      failMessage: rawMessageStatus.fail_message,
    });
  }

  static toPersistence(messageStatus: MessageStatus): MessageStatusPrisma {
    return {
      message_id: messageStatus.messageId.toValue(),
      target: messageStatus.target.value,
      status: messageStatus.status,
      sent_at: messageStatus.sentAt || null,
      fail_message: messageStatus.failMessage || null,
    };
  }

  static toDTO(messageStatus: MessageStatus): MessageStatusDTO {
    return {
      target: messageStatus.target.value,
      status: messageStatus.status,
      sentAt: messageStatus.sentAt?.toISOString(),
      failMessage: messageStatus.failMessage,
    };
  }
}

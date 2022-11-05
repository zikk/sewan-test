import { EntityId } from '../../../shared/core/domain/entity-id';
import { Entity } from '../../../shared/core/domain/entity';
import { MessageTarget } from './message-target.value-object';

export const MESSAGE_STATUS = ['PENDING', 'SENT', 'FAILED'] as const;
export type MessageStatusValue = typeof MESSAGE_STATUS[number];

type MessageStatusProps = {
  messageId: EntityId;
  target: MessageTarget;
  status: MessageStatusValue;
  sentAt?: Date | null;
  failMessage?: string | null;
};

type CreateMessageStatusProps = {
  messageId: EntityId;
  target: MessageTarget;
  status?: MessageStatusValue;
  sentAt?: Date | null;
  failMessage?: string | null;
};

export class MessageStatus extends Entity<MessageStatusProps> {
  get messageId() {
    return this.props.messageId;
  }

  get target() {
    return this.props.target;
  }

  get status() {
    return this.props.status;
  }

  get sentAt() {
    return this.props.sentAt;
  }

  get failMessage() {
    return this.props.failMessage;
  }

  private constructor(props: MessageStatusProps, id?: EntityId) {
    super(props, id);
  }

  static create(props: CreateMessageStatusProps, id?: EntityId): MessageStatus {
    return new MessageStatus(
      {
        ...props,
        status: props.status || 'PENDING',
      },
      id,
    );
  }

  markAsSent(): void {
    this.props.status = 'SENT';
    this.props.sentAt = new Date();
  }

  markAsFailed(message: string): void {
    this.props.status = 'FAILED';
    this.props.failMessage = message;
  }
}

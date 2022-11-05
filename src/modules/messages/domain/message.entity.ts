import { Entity } from '../../../shared/core/domain/entity';
import { EntityId } from '../../../shared/core/domain/entity-id';
import { MessageStatus } from './message-status.entity';

type MessageProps = {
  content: string;
  createdAt: Date;
  statuses: MessageStatus[];
};

type CreateMessageProps = {
  content: string;
  createdAt?: Date;
  statuses?: MessageStatus[];
};

export class Message extends Entity<MessageProps> {
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get statuses() {
    return this.props.statuses;
  }

  get content(): string {
    return this.props.content;
  }

  private constructor(props: MessageProps, id?: EntityId) {
    super(props, id);
  }

  static create(props: CreateMessageProps, id?: EntityId): Message {
    if (!props.content) {
      throw new Error('Message content is required.');
    }

    return new Message(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        statuses: props.statuses || [],
      },
      id,
    );
  }
}

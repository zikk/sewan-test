import { Entity } from 'src/shared/core/domain/entity';
import { EntityId } from 'src/shared/core/domain/entity-id';

type MessageProps = {
  createdAt: Date;
  content: string;
};

export class Message extends Entity<MessageProps> {
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get content(): string {
    return this.props.content;
  }

  private constructor(props: MessageProps, id?: EntityId) {
    super(props, id);
  }

  static create(props: MessageProps, id?: EntityId): Message {
    if (!props.content) {
      throw new Error('Message content is required.');
    }

    return new Message(props, id);
  }
}

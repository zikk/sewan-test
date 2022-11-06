import { EntityId } from '../../../../shared/core/domain/entity-id';
import { MessageStatus } from '../../domain/message-status.entity';
import { Message } from '../../domain/message.entity';
import { MessageRepository } from '../message.repository';

export class MessageInMemoryRepository implements MessageRepository {
  private database: { messages: Map<string, Message> };

  constructor() {
    this.database = {
      messages: new Map(),
    };
  }

  async exists(id: EntityId): Promise<boolean> {
    return this.database.messages.has(id.toValue());
  }

  async get(id: EntityId): Promise<Message | null> {
    return this.database.messages.get(id.toValue()) || null;
  }

  async getAll(): Promise<Message[]> {
    return Array.from(this.database.messages.values());
  }

  async save(message: Message): Promise<void> {
    await this.database.messages.set(message.id.toValue(), message);
  }

  async saveStatus(status: MessageStatus): Promise<void> {
    const message = await this.get(status.messageId);

    if (!message) {
      throw new Error(`Message with id ${status.messageId.toValue()} does not exist`);
    }

    const messageStatus = message.statuses.findIndex(
      (s) =>
        s.messageId.toValue() === status.messageId.toValue() &&
        s.target.value === status.target.value,
    );

    if (messageStatus === -1) {
      message.statuses.push(status);
    } else {
      message.statuses[messageStatus] = status;
    }
  }
}

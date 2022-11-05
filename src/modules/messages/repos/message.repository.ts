import { EntityId } from '../../../shared/core/domain/entity-id';
import { MessageStatus } from '../domain/message-status.entity';
import { Message } from '../domain/message.entity';

export interface MessageRepository {
  exists(id: EntityId): Promise<boolean>;
  get(id: EntityId): Promise<Message | null>;
  getAll(): Promise<Message[]>;
  save(message: Message): Promise<void>;
  saveStatus(status: MessageStatus): Promise<void>;
}

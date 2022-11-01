import { EntityId } from 'src/shared/core/domain/entity-id';
import { Message } from '../domain/message.entity';

export interface MessageRepository {
  get(id: EntityId): Promise<Message>;
}

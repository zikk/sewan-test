import { Message } from '../domain/message.entity';

export interface MessageHttpService {
  send(message: Message): Promise<void>;
}

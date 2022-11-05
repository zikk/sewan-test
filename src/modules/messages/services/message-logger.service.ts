import { Message } from '../domain/message.entity';

export interface MessageLoggerService {
  log(message: Message): Promise<void>;
}

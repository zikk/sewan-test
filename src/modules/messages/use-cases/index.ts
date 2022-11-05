import { SendMessageUseCase } from './send-message.use-case';
import { messageLoggerService } from '../services';
import { messageRepository } from '../repos';

export const sendMessageUseCase = new SendMessageUseCase({
  messageRepository,
  messageLoggerService,
});

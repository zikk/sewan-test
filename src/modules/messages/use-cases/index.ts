import { SendMessageUseCase } from './send-message.use-case';
import { messageLoggerService, messageHttpService } from '../services';
import { messageRepository } from '../repos';
import { GetMessagesUseCase } from './get-messages.use-case';

export const sendMessageUseCase = new SendMessageUseCase({
  messageRepository,
  messageLoggerService,
  messageHttpService,
});

export const getMessagesUseCase = new GetMessagesUseCase(messageRepository);

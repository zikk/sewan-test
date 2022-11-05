import { SendMessageUseCase } from './send-message.use-case';
import { messageLoggerService } from '../services';
import { messageRepository } from '../repos';
import { GetMessages } from './get-messages.use-case';

export const sendMessageUseCase = new SendMessageUseCase({
  messageRepository,
  messageLoggerService,
});

export const getMessagesUseCase = new GetMessages(messageRepository);

import { MessageLoggerWinstonService } from './implementations/message-logger.winston.service';

export const messageLoggerService = MessageLoggerWinstonService.get();

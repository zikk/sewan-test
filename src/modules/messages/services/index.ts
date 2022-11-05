import { MessageHttpfetchService } from './implementations/message-http.fetch.service';
import { MessageLoggerWinstonService } from './implementations/message-logger.winston.service';

export const messageLoggerService = MessageLoggerWinstonService.get();
export const messageHttpService = new MessageHttpfetchService();

/* eslint-disable no-underscore-dangle */
import { createLogger, format, Logger, transports } from 'winston';
import { Message } from '../../domain/message.entity';
import { MessageLoggerService } from '../message-logger.service';
// import config from '../../../../config';

export class MessageLoggerWinstonService implements MessageLoggerService {
  private logger: Logger;
  private static _instance: MessageLoggerWinstonService | null = null;

  public static get(): MessageLoggerWinstonService {
    if (!MessageLoggerWinstonService._instance) {
      MessageLoggerWinstonService._instance = new MessageLoggerWinstonService();
    }

    return MessageLoggerWinstonService._instance;
  }

  private constructor() {
    this.logger = createLogger({
      format: format.json(),
      level: 'info',
      transports: [
        new transports.Console(),
        // new transports.File({
        //   filename: config.messagesLogFile,
        // }),
      ],
    });
  }

  async log(message: Message): Promise<void> {
    this.logger.info(`Message logged: ${message.content}`);
  }
}

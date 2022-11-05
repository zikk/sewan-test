import { UseCase } from '../../../shared/core/use-case';
import { MessageStatus } from '../domain/message-status.entity';
import { MessageTarget } from '../domain/message-target.value-object';
import { Message } from '../domain/message.entity';
import { MessageRepository } from '../repos/message.repository';
import { MessageHttpService } from '../services/message-http.service';
import { MessageLoggerService } from '../services/message-logger.service';

type SendMessageDTO = {
  content: string;
};

export namespace sendMessageErrors {
  export class MessageContentRequired extends Error {
    constructor() {
      super('Message content is required.');
    }
  }
}

export class SendMessageUseCase implements UseCase<SendMessageDTO, Promise<Message>> {
  private messageRepository: MessageRepository;
  private messageLoggerService: MessageLoggerService;
  private messageHttpService: MessageHttpService;

  constructor({
    messageRepository,
    messageLoggerService,
    messageHttpService,
  }: {
    messageRepository: MessageRepository;
    messageLoggerService: MessageLoggerService;
    messageHttpService: MessageHttpService;
  }) {
    this.messageRepository = messageRepository;
    this.messageLoggerService = messageLoggerService;
    this.messageHttpService = messageHttpService;
  }

  async sendMessageToLogger(message: Message) {
    const httpLogStatus = MessageStatus.create({
      messageId: message.id,
      target: MessageTarget.create('HTTP'),
    });
    await this.messageRepository.saveStatus(httpLogStatus);

    try {
      await this.messageHttpService.send(message);
      httpLogStatus.markAsSent();
      await this.messageRepository.saveStatus(httpLogStatus);
    } catch (error: any) {
      httpLogStatus.markAsFailed(error.message);
      await this.messageRepository.saveStatus(httpLogStatus);
    }
  }

  async sendMessageToHttp(message: Message) {
    const logStatus = MessageStatus.create({
      messageId: message.id,
      target: MessageTarget.create('LOG'),
    });
    await this.messageRepository.saveStatus(logStatus);

    try {
      await this.messageLoggerService.log(message);
      logStatus.markAsSent();
      await this.messageRepository.saveStatus(logStatus);
    } catch (error: any) {
      logStatus.markAsFailed(error.message);
      await this.messageRepository.saveStatus(logStatus);
    }
  }

  async sendMessageToTargets(message: Message) {
    await Promise.all([this.sendMessageToLogger(message), this.sendMessageToHttp(message)]);
  }

  async execute(request: SendMessageDTO): Promise<Message> {
    if (!request.content) {
      throw new sendMessageErrors.MessageContentRequired();
    }

    const message = Message.create({
      content: request.content,
    });

    await this.messageRepository.save(message);

    this.sendMessageToTargets(message);
    return message;
  }
}

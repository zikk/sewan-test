import { UseCase } from '../../../shared/core/use-case';
import { MessageStatus } from '../domain/message-status.entity';
import { MessageTarget } from '../domain/message-target.value-object';
import { Message } from '../domain/message.entity';
import { MessageRepository } from '../repos/message.repository';
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

  constructor({
    messageRepository,
    messageLoggerService,
  }: {
    messageRepository: MessageRepository;
    messageLoggerService: MessageLoggerService;
  }) {
    this.messageRepository = messageRepository;
    this.messageLoggerService = messageLoggerService;
  }

  async sendMessageToTargets(message: Message) {
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

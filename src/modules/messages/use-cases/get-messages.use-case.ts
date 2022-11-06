import { UseCase } from '../../../shared/core/use-case';
import { Message } from '../domain/message.entity';
import { MessageMapper } from '../mappers/message.mapper';
import { MessageRepository } from '../repos/message.repository';

export class GetMessagesUseCase implements UseCase<any, Message[]> {
  private messageRepository: any;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(): Promise<Message[]> {
    const messages = await this.messageRepository.getAll();
    return messages.map(MessageMapper.toDTO);
  }
}

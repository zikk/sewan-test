import { GetMessagesUseCase } from './get-messages.use-case';
import { MessageInMemoryRepository } from '../repos/implementations/message.in-memory.repository';
import { Message } from '../domain/message.entity';
import { MessageStatus } from '../domain/message-status.entity';
import { MessageTarget } from '../domain/message-target.value-object';

describe('GetMessagesUseCase', () => {
  const messageRepository = new MessageInMemoryRepository();
  const getMessagesUseCase = new GetMessagesUseCase(messageRepository);

  it('should return a list of messages', async () => {
    const message = Message.create({ content: 'Hello World' });
    await messageRepository.save(message);
    const logStatus = MessageStatus.create({
      messageId: message.id,
      target: MessageTarget.create('LOG'),
    });
    await messageRepository.saveStatus(logStatus);

    const messages = await getMessagesUseCase.execute();
    expect(messages).toHaveLength(1);
    expect(messages[0].content).toBe('Hello World');
    expect(messages[0].statuses[0].target).toBe('LOG');
    expect(messages[0].statuses[0].status).toBe('PENDING');
  });
});

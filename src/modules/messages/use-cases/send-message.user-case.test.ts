import { SendMessageUseCase } from './send-message.use-case';
import { MessageInMemoryRepository } from '../repos/implementations/message.in-memory.repository';

const MessageLoggerWinstonService = jest.fn().mockImplementation(() => {
  return {
    log: jest.fn(),
  };
});

const MessageHttpfetchService = jest.fn().mockImplementation(() => {
  return {
    send: jest.fn(),
  };
});

describe('SendMessageUseCase', () => {
  const messageRepository = new MessageInMemoryRepository();
  const messageLoggerService = new MessageLoggerWinstonService();
  const messageHttpService = new MessageHttpfetchService();

  const sendMessageUseCase = new SendMessageUseCase({
    messageRepository,
    messageLoggerService,
    messageHttpService,
  });

  it('should throw an error if message content is not provided', async () => {
    // @ts-expect-error
    await expect(sendMessageUseCase.execute({})).rejects.toThrow('Message content is required');
  });

  it('should persist message correctly', async () => {
    const message = await sendMessageUseCase.execute({ content: 'Message to send' });
    const persistedMessage = await messageRepository.get(message.id);

    expect(persistedMessage!.content).toBe('Message to send');
    expect(messageLoggerService.log).toHaveBeenCalled();
    expect(messageHttpService.send).toHaveBeenCalled();
  });
});

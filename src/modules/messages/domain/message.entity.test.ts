import { Message } from './message.entity';

describe('Message', () => {
  it('should throw an error if message content is not provided', () => {
    // @ts-expect-error
    expect(() => Message.create({})).toThrow('Message content is required.');
  });

  it('should create message correctly', () => {
    const message = Message.create({ content: 'Message to send' });
    expect(message.content).toBe('Message to send');
  });
});

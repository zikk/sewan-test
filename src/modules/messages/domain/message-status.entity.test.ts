import { EntityId } from '../../../shared/core/domain/entity-id';
import { MessageStatus } from './message-status.entity';
import { MessageTarget } from './message-target.value-object';

describe('MessageStatus', () => {
  it('should create message status correctly', () => {
    const messageStatus = MessageStatus.create({
      messageId: new EntityId('message-id'),
      target: MessageTarget.create('LOG'),
    });

    expect(messageStatus.messageId.toValue()).toBe('message-id');
    expect(messageStatus.target.value).toBe('LOG');
    expect(messageStatus.status).toBe('PENDING');
    expect(messageStatus.sentAt).toBeUndefined();
    expect(messageStatus.failMessage).toBeUndefined();
  });

  it('should mark message status as sent', () => {
    const messageStatus = MessageStatus.create({
      messageId: new EntityId('message-id'),
      target: MessageTarget.create('LOG'),
    });

    messageStatus.markAsSent();
    expect(messageStatus.status).toBe('SENT');
  });

  it('should mark message status as failed', () => {
    const messageStatus = MessageStatus.create({
      messageId: new EntityId('message-id'),
      target: MessageTarget.create('LOG'),
    });

    messageStatus.markAsFailed('Error message');
    expect(messageStatus.status).toBe('FAILED');
    expect(messageStatus.failMessage).toBe('Error message');
  });
});

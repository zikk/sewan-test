import { ValueObject } from '../../../shared/core/domain/value-object';

export const MESSAGE_TARGETS = ['LOG', 'EMAIL', 'HTTP', 'SMS', 'SLACK'] as const;
export type MessageTargetValue = typeof MESSAGE_TARGETS[number];

export type MessageTargetProps = {
  value: MessageTargetValue;
};

export class MessageTarget extends ValueObject<MessageTargetProps> {
  get value(): MessageTargetValue {
    return this.props.value;
  }

  private constructor(props: MessageTargetProps) {
    super(props);
  }

  static create(value: MessageTargetValue): MessageTarget {
    if (!MESSAGE_TARGETS.includes(value)) {
      throw new Error('Invalid target');
    }

    return new MessageTarget({ value });
  }
}

import { sendMessageUseCase } from '../../../modules/messages/use-cases';

export default {
  Mutation: {
    async sendMessage(_, { message }: { message: string }): Promise<{ created: boolean }> {
      if (!message) {
        throw new Error('Message content is required.');
      }

      await sendMessageUseCase.execute({ content: message });
      return { created: true };
    },
  },
};

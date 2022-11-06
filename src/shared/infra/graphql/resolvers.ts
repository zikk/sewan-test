import { getMessagesUseCase, sendMessageUseCase } from '../../../modules/messages/use-cases';

export default {
  Query: {
    async getMessages() {
      return getMessagesUseCase.execute();
    },
  },

  Mutation: {
    async sendMessage(_, args: { message: string }): Promise<{ created: boolean }> {
      await sendMessageUseCase.execute({ content: args?.message });
      return { created: true };
    },
  },
};

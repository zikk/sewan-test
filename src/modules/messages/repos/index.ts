import { database } from '../../../shared/infra/prisma/database';
import { MessagePrismaRepository } from './implementations/message.prisma-repository';

export const messageRepository = new MessagePrismaRepository(database);

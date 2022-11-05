import { PrismaClient, Prisma } from '@prisma/client';
import config from '../../../config';
import logger from '../logger';

const { url: DATABASE_URL } = config.database;
export const database: { prisma?: PrismaClient } = {};

type PrismaClientOptionsType = Prisma.Subset<
  Prisma.PrismaClientOptions,
  Prisma.PrismaClientOptions
>;

export async function init(options?: PrismaClientOptionsType) {
  if (options) {
    database.prisma = new PrismaClient(options);
  } else if (!(database.prisma instanceof PrismaClient)) {
    const prismaClientOptions = { datasources: { db: { url: DATABASE_URL } } };
    database.prisma = new PrismaClient(prismaClientOptions);
  }

  await database.prisma.$queryRaw`select 1+1 as result`;
  if (process.env.NODE_ENV !== 'test') {
    logger.info(`Connected to database on "${options?.datasources?.db?.url || DATABASE_URL}"`);
  }
}

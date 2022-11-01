import Fastify from 'fastify';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import mercurius from 'mercurius';
import logger from '../logger';
import gqlSchema from '../graphql/schema';
import gqlResolvers from '../graphql/resolvers';
import config from '../../../config';

const app = Fastify();

await app.register(fastifyCompress);
await app.register(fastifyHelmet);
await app.register(mercurius, {
  schema: gqlSchema,
  resolvers: gqlResolvers,
  path: '/graphql',
});

try {
  await app.ready();
  await app.listen({ port: config.server.port, host: '0.0.0.0' });
  logger.log('info', `Server listening on port ${config.server.port}`);
} catch (err) {
  logger.error(err);
  process.exit(1);
}

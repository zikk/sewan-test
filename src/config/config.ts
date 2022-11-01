import path from 'node:path';
import dotenv from 'dotenv';
import merge from 'lodash/merge';
import z from 'zod';

const CONFIG_PATH = path.join(process.cwd(), './environment', '.env');
dotenv.config({ path: CONFIG_PATH });

let envConfig: {
  someEnvVar: string;
};

switch (process.env.NODE_ENV) {
  case 'test':
    envConfig = (await import('./test')) as any;
    break;
  case 'development':
    envConfig = (await import('./development')) as any;
    break;
  case 'production':
    envConfig = (await import('./production')) as any;
    break;
  default:
    throw new Error(`NODE_ENV ${process.env.NODE_ENV} is not supported`);
}

const Config = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  PORT: z
    .string()
    .regex(/^\d+$/)
    .transform((value) => parseInt(value, 10)),
  DATABASE_URL: z.string().url(),
});

const result = Config.safeParse(process.env);
if (!result.success) {
  throw new Error(`Config validation error : ${result.error.message}`);
}

const config = {
  isDevelopment: result.data.NODE_ENV === 'development',
  server: {
    port: result.data.PORT,
  },
  database: {
    url: result.data.DATABASE_URL,
  },
};

export default merge(config, envConfig);

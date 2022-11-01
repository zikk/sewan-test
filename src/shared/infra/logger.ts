import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.splat(),
    format.errors({ stack: true }),
  ),
  transports: [new transports.Console()],
});

export default logger;

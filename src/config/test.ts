/* eslint-disable no-underscore-dangle, @typescript-eslint/naming-convention */
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  messagesLogFile: path.join(__dirname, '../../logs/messages.log'),
};

import got from 'got';
import { MessageHttpService } from '../message-http.service';
import config from '../../../../config';
import { Message } from '../../domain/message.entity';

export class MessageHttpfetchService implements MessageHttpService {
  private url: string;

  constructor(url?: string) {
    this.url = url || config.httpLogUrl;
  }

  async send(message: Message): Promise<void> {
    await got.post(this.url, {
      json: { message: message.content },
    });
  }
}

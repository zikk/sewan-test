import { v4 as uuidv4 } from 'uuid';
import { Identifier } from './identifier';

export class EntityId extends Identifier {
  constructor(id?: string) {
    super(id || uuidv4());
  }
}

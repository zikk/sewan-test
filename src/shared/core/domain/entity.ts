import { EntityId } from './entity-id';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: EntityId;

  protected props: T;

  get id(): EntityId {
    return this._id;
  }

  constructor(props: T, id?: EntityId) {
    this._id = id || new EntityId();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}

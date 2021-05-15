import { Collection } from 'mongodb';

export abstract class MongoDBRepository<T extends { id: string }> {
  constructor(private readonly collection: Collection) {}

  async save(entity: T) {
    const filterQuery = { _id: entity.id };
    const options = { upsert: true };
    await this.collection.findOneAndReplace(filterQuery, entity, options);
  }
}

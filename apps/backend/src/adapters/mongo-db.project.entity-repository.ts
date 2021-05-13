import { Collection, Db as MongoDB } from 'mongodb';
import { ProjectEntity, ProjectEntityRepository } from '@simple-jira/domain-project';

export class MongoDBProjectEntityRepository implements ProjectEntityRepository {
  private readonly collection: Collection;

  constructor(mongoDB: MongoDB) {
    this.collection = mongoDB.collection('projects');
  }

  async save(projectEntity: ProjectEntity) {
    const filterQuery = { _id: projectEntity.id };
    const updateQuery = { $set: { name: projectEntity.name } };
    const options = { upsert: true };
    await this.collection.updateOne(filterQuery, updateQuery, options);
  }
}

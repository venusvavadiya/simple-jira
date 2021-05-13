import { Collection, Db as MongoDB } from 'mongodb';
import { ProjectEntity, ProjectReadRepository } from '@simple-jira/domain-project';

export class MongoDBProjectReadRepository implements ProjectReadRepository {
  private readonly collection: Collection;

  constructor(db: MongoDB) {
    this.collection = db.collection('projects');
  }

  async save(projectEntity: ProjectEntity) {
    const filterQuery = { _id: projectEntity.id };
    const updateQuery = { $set: { name: projectEntity.name } };
    const options = { upsert: true };
    await this.collection.updateOne(filterQuery, updateQuery, options);
  }
}

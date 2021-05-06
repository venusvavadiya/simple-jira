import { Project } from './entities/project';
import { ProjectRepository } from './repositories/repository';

export class MongoDbRepository implements ProjectRepository {
  private collectionName = 'projects'
  private collection

  constructor(private readonly dbClient) {
    this.collection = dbClient.collection(this.collectionName);
  }

  async create(project: Project) {
    const query = { _id: project.id };
    const update = { $setOnInsert: query };
    await this.collection.updateOne(query, update, { upsert: true });
  }

  async update(project: Project) {
    const query = { _id: project.id };
    const update = { $set: { name: project.name } };
    await this.collection.updateOne(query, update);
  }
}

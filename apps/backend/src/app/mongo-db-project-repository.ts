import { Project } from './entities/project';
import { ProjectRepository } from './repositories/project-repository';

export class MongoDbProjectRepository implements ProjectRepository {
  private readonly collection;

  constructor(dbClient) {
    this.collection = dbClient.collection('projects');
  }

  async existsById(projectId: string) {
    const project = await this.collection.findOne({ _id: projectId });
    return Boolean(project);
  }

  async save(project: Project) {
    const filter = { _id: project.id };
    const createParams = { $setOnInsert: filter };
    const updateParams = { $set: { name: project.name } };
    const exists = await this.existsById(project.id);
    const update = exists ? updateParams : createParams;

    await this.collection.updateOne(filter, update, { upsert: true });
  }
}

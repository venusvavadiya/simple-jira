import { Project } from './entities/project';
import { ProjectRepository } from './repositories/project-repository';

export class MongoDbProjectRepository implements ProjectRepository {
  private readonly collection;

  constructor(client) {
    this.collection = client.collection('projects');
  }

  async existsById(projectId: string) {
    const project = await this.collection.findOne({ _id: projectId });
    return Boolean(project);
  }

  async save(project: Project) {
    const filter = { _id: project.id };
    const update = { $set: { name: project.name } };
    await this.collection.updateOne(filter, update, { upsert: true });
  }
}

import { Collection, Db as MongoDB } from 'mongodb';
import { Project } from './entities/project';
import { ProjectRepository } from './repositories/project-repository';

export class MongoDBProjectRepository implements ProjectRepository {
  private readonly collection: Collection;

  constructor(db: MongoDB) {
    this.collection = db.collection('projects');
  }

  async existsById(projectId: string) {
    const project = await this.collection.findOne({ _id: projectId });
    return Boolean(project);
  }

  async save(project: Project) {
    const filterQuery = { _id: project.id };
    const updateQuery = { $set: { name: project.name } };
    const options = { upsert: true };
    await this.collection.updateOne(filterQuery, updateQuery, options);
  }
}

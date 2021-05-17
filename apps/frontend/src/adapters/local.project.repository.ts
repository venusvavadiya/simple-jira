import { ProjectRepository } from '../domain-project/repositories/project.repository';
import { Project } from '../domain-project/entities/project.entity';

export class LocalProjectRepository implements ProjectRepository {
  private projects: Project[] = [
    { id: 'id1', name: 'Project 1' },
    { id: 'id2', name: 'Project 2' },
  ];

  async getAll(): Promise<Project[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.projects);
      }, 2000);
    });
  }

  async save(project: Project): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.projects = this.projects.map((p) => (p.id === project.id ? project : p));
        resolve();
      }, 2000);
    });
  }
}

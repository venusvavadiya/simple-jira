import { Project } from '../entities/project.entity';

export interface ProjectRepository {
  getAll(): Promise<Project[]>;
  save(project: Project): Promise<void>;
}

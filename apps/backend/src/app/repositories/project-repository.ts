import { Project } from '../entities/project';

export interface ProjectRepository {
  save(project: Project): Promise<void>;
}

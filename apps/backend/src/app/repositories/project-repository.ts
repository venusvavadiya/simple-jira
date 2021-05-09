import { Project } from '../entities/project';

export declare interface ProjectRepository {
  existsById(projectId: string): Promise<boolean>;
  save(project: Project): Promise<void>;
}

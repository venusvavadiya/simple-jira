import { Project } from '@simple-jia/backend/entities/project';

export declare interface ProjectRepository {
  save(project: Project): Promise<void>;
  existsById(projectId: string): Promise<boolean>;
}

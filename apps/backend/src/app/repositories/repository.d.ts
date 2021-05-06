import { Project } from '@simple-jia/backend/entities/project';

export declare interface ProjectRepository {
  create(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
}

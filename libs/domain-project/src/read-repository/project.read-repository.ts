import { ProjectEntity } from '../entity/project.entity';

export interface ProjectReadRepository {
  save(projectEntity: ProjectEntity): Promise<void>;
}

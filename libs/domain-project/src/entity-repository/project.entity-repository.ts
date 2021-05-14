import { ProjectEntity } from '../entity/project.entity';

export interface ProjectEntityRepository {
  save(projectEntity: ProjectEntity): Promise<void>;
}

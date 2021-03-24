import { ProjectAggregate } from '../aggregate/project.aggregate';

export interface ProjectAggregateRepository {
  getById(id: string): ProjectAggregate
  save(projectAggregate: ProjectAggregate): Promise<void>
}

import { AggregateRepository } from '@points-log/domain-core';
import { ProjectAggregate } from '../aggregate/project.aggregate';

export class ProjectAggregateRepository extends AggregateRepository<ProjectAggregate> {
  // eslint-disable-next-line class-methods-use-this
  getNewInstance(): ProjectAggregate {
    return new ProjectAggregate();
  }
}

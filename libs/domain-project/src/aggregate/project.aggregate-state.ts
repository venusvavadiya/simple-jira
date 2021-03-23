import { AggregateState } from '@simple-jira/domain-core';

export interface ProjectAggregateState extends AggregateState {
  id?: string
  name?: string
}

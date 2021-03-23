import { Aggregator, Event } from '@simple-jira/domain-core';
import { ProjectCreatedV1EventData } from '../event/project-created.event-data';
import { ProjectRenamedV1EventData } from '../event/project-renamed.event-data';
import { ProjectAggregateState } from './project.aggregate-state';

export const ProjectAggregator: Aggregator = {
  applyProjectCreatedV1Event(
    state: ProjectAggregateState,
    event: Event<ProjectCreatedV1EventData>,
  ): ProjectAggregateState {
    const id = event.data.projectId;
    return { ...state, id };
  },

  applyProjectRenamedV1Event(
    state: ProjectAggregateState,
    event: Event<ProjectRenamedV1EventData>,
  ): ProjectAggregateState {
    const name = event.data.projectName;
    return { ...state, name };
  },
};

import { Aggregator } from '@simple-jira/domain-core';
import { ProjectCreatedV1Event } from '../event/project-created.event';
import { ProjectRenamedV1Event } from '../event/project-renamed.event';
import { ProjectAggregateState as State } from './project.aggregate-state';

export const ProjectAggregator: Aggregator<State> = {
  init(): State {
    return {};
  },

  applyProjectCreatedV1Event(state: State, event: ProjectCreatedV1Event): State {
    const id = event.data.projectId;
    return { ...state, id };
  },

  applyProjectRenamedV1Event(state: State, event: ProjectRenamedV1Event): State {
    const name = event.data.projectName;
    return { ...state, name };
  },
};

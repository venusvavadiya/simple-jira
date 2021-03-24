import { Aggregate } from '@simple-jira/domain-core';
import { ProjectInitializedV1Event } from '../../event/project-initialized.event';
import { ProjectRenamedV1Event } from '../../event/project-renamed.event';

export class ProjectAggregate extends Aggregate {
  id: string
  name: string

  initialize(id: string) {

  }

  rename(name: string) {

  }

  // Events

  applyProjectInitializedV1Event(event: ProjectInitializedV1Event) {
    this.id = event.data.projectId;
  }

  applyProjectRenamedV1Event(event: ProjectRenamedV1Event) {
    this.name = event.data.projectName;
  }
}

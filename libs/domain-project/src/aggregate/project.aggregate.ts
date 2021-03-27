import { Aggregate } from '@simple-jira/domain-core';
import { ProjectCreatedV1Event } from '../event/project-created.event';
import { ProjectRenamedV1Event } from '../event/project-renamed.event';

export class ProjectAggregate extends Aggregate {
  name: string

  create(id: string) {
    const event = new ProjectCreatedV1Event(id);
    this.raiseEvent(event);
  }

  rename(name: string) {
    const event = new ProjectRenamedV1Event(this.id, name);
    this.raiseEvent(event);
  }

  // Events

  applyProjectCreatedV1Event(event: ProjectCreatedV1Event) {
    this.id = event.data.projectId;
  }

  applyProjectRenamedV1Event(event: ProjectRenamedV1Event) {
    this.name = event.data.projectName;
  }
}

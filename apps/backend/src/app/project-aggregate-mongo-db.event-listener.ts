import { EventListener, Event } from '@points-log/domain-core';
import { ProjectCreatedV1Event, ProjectRenamedV1Event } from '@simple-jira/domain-project';
import { Project } from './entities/project';

export class ProjectAggregateMongoDBEventListener implements EventListener {
  eventTypePrefixes = ['ProjectAggregate']

  constructor(private readonly mongoDBRepository) {}

  async on(event: Event) {
    const methodName = `on${event.type}`;
    if (this[methodName]) await this[methodName](event);
  }

  async onProjectCreatedV1Event(event: ProjectCreatedV1Event) {
    const id = event.data.projectId;
    const project = new Project(id);
    await this.mongoDBRepository.save(project);
  }

  async onProjectRenamedV1Event(event: ProjectRenamedV1Event) {
    const id = event.data.projectId;
    const name = event.data.projectName;
    const project = new Project(id, name);
    await this.mongoDBRepository.save(project);
  }
}

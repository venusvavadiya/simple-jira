import { EventListener, Event } from '@points-log/domain-core';
import { ProjectCreatedV1Event, ProjectRenamedV1Event } from '@simple-jira/domain-project';
import { Project } from './entities/project';
import { ProjectRepository } from './repositories/project-repository';

// noinspection JSUnusedGlobalSymbols
export class ProjectAggregateEventListener implements EventListener {
  eventTypePrefixes = ['ProjectAggregate'];

  constructor(private readonly projectRepository: ProjectRepository) {}

  async on(event: Event) {
    const methodName = `on${event.type}`;
    if (this[methodName]) await this[methodName](event);
  }

  async onProjectCreatedV1Event(event: ProjectCreatedV1Event) {
    const id = event.data.projectId;
    const project = new Project(id);
    await this.projectRepository.save(project);
  }

  async onProjectRenamedV1Event(event: ProjectRenamedV1Event) {
    const id = event.data.projectId;
    const name = event.data.projectName;
    const project = new Project(id, name);
    await this.projectRepository.save(project);
  }
}

import { EventListener, Event } from '@points-log/domain-core';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectCreatedV1Event } from '../event/project-created.event';
import { ProjectRenamedV1Event } from '../event/project-renamed.event';
import { ProjectReadRepository } from '../read-repository/project.read-repository';

// noinspection JSUnusedGlobalSymbols
export class ProjectAggregateEventListener implements EventListener {
  eventTypePrefixes = ['ProjectAggregate'];

  constructor(private readonly projectRepository: ProjectReadRepository) {}

  async on(event: Event) {
    const methodName = `on${event.type}`;
    if (this[methodName]) await this[methodName](event);
  }

  async onProjectCreatedV1Event(event: ProjectCreatedV1Event) {
    const id = event.data.projectId;
    const projectEntity = new ProjectEntity(id);
    await this.projectRepository.save(projectEntity);
  }

  async onProjectRenamedV1Event(event: ProjectRenamedV1Event) {
    const id = event.data.projectId;
    const name = event.data.projectName;
    const projectEntity = new ProjectEntity(id, name);
    await this.projectRepository.save(projectEntity);
  }
}

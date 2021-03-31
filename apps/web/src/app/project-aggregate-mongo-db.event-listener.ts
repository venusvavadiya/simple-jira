import { EventListener, Event } from '@simple-jira/domain-core';
import { ProjectCreatedV1Event, ProjectRenamedV1Event } from '@simple-jira/domain-project';

export class ProjectAggregateMongoDBEventListener implements EventListener {
  eventTypePrefixes = ['ProjectAggregate']

  constructor(private readonly projectsCollection) {}

  async on(event: Event) {
    const methodName = `on${event.type}`;
    if (this[methodName]) this[methodName](event);
  }

  async onProjectCreatedV1Event(event: ProjectCreatedV1Event) {
    const query = { _id: event.data.projectId };
    const update = { $setOnInsert: query };
    await this.projectsCollection.updateOne(query, update, { upsert: true });
  }

  async onProjectRenamedV1Event(event: ProjectRenamedV1Event) {
    const query = { _id: event.data.projectId };
    const update = { $set: { name: event.data.projectName } };
    await this.projectsCollection.updateOne(query, update);
  }
}

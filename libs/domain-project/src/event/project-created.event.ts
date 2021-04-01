import { EventMetadata, Event } from '@points-log/domain-core';

export class ProjectCreatedV1Event implements Event {
  readonly type = 'ProjectCreatedV1Event'

  readonly data: {
    readonly projectId: string
  }

  readonly metadata: EventMetadata

  constructor(projectId: string) {
    this.data = { projectId };
    this.metadata = { timestamp: new Date() };
  }
}

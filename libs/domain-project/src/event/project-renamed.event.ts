import { EventMetadata, Event } from '@simple-jira/domain-core';

export class ProjectRenamedV1Event implements Event {
  readonly type = 'ProjectRenamedV1Event'

  readonly data: {
    readonly projectId: string
    readonly projectName: string
  }

  readonly metadata: EventMetadata

  constructor(projectId: string, projectName: string) {
    this.data = { projectId, projectName };
    this.metadata = { timestamp: new Date() };
  }
}

import { Event } from '@simple-jira/domain-core';

export class ProjectCreatedV1Event extends Event {
  readonly data: {
    readonly projectId: string
  }

  constructor(projectId: string) {
    super();
    this.data = { projectId };
  }
}

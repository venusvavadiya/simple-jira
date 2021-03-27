import { Event } from '@simple-jira/domain-core';

export class ProjectRenamedV1Event extends Event {
  readonly data: {
    readonly projectId: string
    readonly projectName: string
  }

  constructor(projectId: string, projectName: string) {
    super();
    this.data = { projectId, projectName };
  }
}

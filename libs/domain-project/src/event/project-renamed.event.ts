import { Event } from '@simple-jira/domain-core';

export type ProjectRenamedV1Event = Event<{
  readonly projectId: string
  readonly projectName: string
}>

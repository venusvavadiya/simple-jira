import { Event } from '@simple-jira/domain-core';

export type ProjectCreatedV1Event = Event<{
  readonly projectId: string
}>

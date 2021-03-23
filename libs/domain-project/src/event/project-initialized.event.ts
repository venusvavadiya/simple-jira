import { Event } from '@simple-jira/domain-core';

export type ProjectInitializedV1Event = Event<{
  readonly projectId: string
}>

import { EventData } from '@simple-jira/domain-core';

export interface ProjectCreatedV1EventData extends EventData {
  readonly projectId: string
}

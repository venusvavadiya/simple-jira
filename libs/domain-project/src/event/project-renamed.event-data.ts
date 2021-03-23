import { EventData } from '@simple-jira/domain-core';

export interface ProjectRenamedV1EventData extends EventData {
  readonly projectId: string
  readonly projectName: string
}

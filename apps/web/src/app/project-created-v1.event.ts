import { Event, EventData } from './event';

interface ProjectCreatedV1EventData extends EventData {
  projectId: string
}

export class ProjectCreatedV1Event extends Event<ProjectCreatedV1EventData> {
  constructor(projectId: string) {
    const data = { projectId };
    super('project-created-v1', data);
  }
}

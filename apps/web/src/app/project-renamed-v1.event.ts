import { Event } from './event';

export class ProjectRenamedV1Event extends Event {
  constructor(
    readonly projectId: string,
    readonly projectName: string,
  ) {
    super();
  }
}

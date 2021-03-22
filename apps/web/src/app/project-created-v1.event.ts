import { Event } from './event';

export class ProjectCreatedV1Event extends Event {
  constructor(readonly projectId: string) {
    super();
  }
}

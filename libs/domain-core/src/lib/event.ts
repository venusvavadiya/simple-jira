import { EventMetadata } from './event-metadata';

export class Event {
  readonly type: string
  readonly metadata: EventMetadata

  constructor() {
    const timestamp = new Date();
    this.metadata = { timestamp };
  }
}

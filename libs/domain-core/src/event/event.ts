import { EventMetadata } from './event-metadata';

export class Event {
  readonly metadata: EventMetadata

  constructor() {
    const timestamp = new Date();
    this.metadata = { timestamp };
  }
}

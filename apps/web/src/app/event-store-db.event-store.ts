import {
  EventStoreDBClient,
  jsonEvent,
  NO_STREAM,
} from '@eventstore/db-client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EventData {}

interface Event {
  type: string
  data: EventData
}

export class EventStoreDBEventStore {
  constructor(private readonly client: EventStoreDBClient) {}

  async append(stream: string, events: Event[], version: number): Promise<void> {
    const jsonEvents = events.map(jsonEvent);
    const expectedRevision = EventStoreDBEventStore.determineVersion(version);
    await this.client.appendToStream(stream, jsonEvents, { expectedRevision });
  }

  private static determineVersion(version: number): typeof NO_STREAM | bigint {
    return version === -1 ? NO_STREAM : BigInt(version);
  }
}

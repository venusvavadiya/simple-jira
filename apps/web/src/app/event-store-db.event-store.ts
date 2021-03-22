import {
  EventStoreDBClient,
  jsonEvent,
  JSONType,
  NO_STREAM,
} from '@eventstore/db-client';
import { Event, EventData } from './event';

export class EventStoreDBEventStore {
  constructor(private readonly client: EventStoreDBClient) {}

  async append(
    stream: string,
    events: Event<EventData>[],
    version: number,
  ): Promise<void> {
    const jsonEvents = events.map(EventStoreDBEventStore.mapEventToJsonEvent);
    const expectedRevision = EventStoreDBEventStore.determineVersion(version);
    await this.client.appendToStream(stream, jsonEvents, { expectedRevision });
  }

  private static determineVersion(version: number): typeof NO_STREAM | bigint {
    return version === -1 ? NO_STREAM : BigInt(version);
  }

  private static mapEventToJsonEvent(event: Event<EventData>) {
    const { type, data, timestamp } = event;
    const metadata = { timestamp };
    return jsonEvent({
      type,
      data: data as JSONType,
      metadata,
    });
  }
}

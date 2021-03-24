import {
  EventStoreDBClient,
  jsonEvent,
  JSONType,
  NO_STREAM,
} from '@eventstore/db-client';
import { Event } from './event';

// TODO: Rename revision to expectedRevision

export class EventStoreDBEventStore {
  constructor(private readonly client: EventStoreDBClient) {}

  async append(
    stream: string,
    events: Event[],
    revision: number,
  ): Promise<void> {
    const jsonEvents = events.map(EventStoreDBEventStore.mapEventToJsonEvent);
    const expectedRevision = EventStoreDBEventStore.determineRevision(revision);
    await this.client.appendToStream(stream, jsonEvents, { expectedRevision });
  }

  private static determineRevision(revision: number): typeof NO_STREAM | bigint {
    return revision === -1 ? NO_STREAM : BigInt(revision);
  }

  private static mapEventToJsonEvent(event: Event) {
    const type = event.constructor.name;
    const { timestamp, ...data } = event;
    return jsonEvent({
      type,
      data: data as JSONType,
      metadata: { timestamp },
    });
  }
}

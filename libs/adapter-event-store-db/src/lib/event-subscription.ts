import { EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { EventListener, EventSubscription, Event } from '@points-log/domain-core';

export class EventStoreDBEventSubscription implements EventSubscription {
  constructor(private readonly client: EventStoreDBClient) {}

  register(listener: EventListener) {
    const prefixes = listener.eventTypePrefixes;
    const filter = streamNameFilter({ prefixes });
    this.client
      .subscribeToAll({ filter })
      .on('data', ({ event }) => listener.on(event as unknown as Event));
  }
}

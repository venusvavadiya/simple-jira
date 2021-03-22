import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from './event-store-db.event-store';
import { ProjectCreatedV1Event } from './project-created-v1.event';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  getData() {
    const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
    const eventStore = new EventStoreDBEventStore(client);

    const someId = 'other-id2';
    const projectCreatedEventV1 = new ProjectCreatedV1Event(someId);
    eventStore.append(`project-aggregate-${someId}`, [projectCreatedEventV1], -1);

    return {};
  }
}

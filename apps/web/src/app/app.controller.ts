import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from './event-store-db.event-store';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  getData() {
    const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
    const eventStore = new EventStoreDBEventStore(client);

    const someId = 'some-id';
    const projectCreatedEventDataV1 = { projectId: someId };
    const projectCreatedEventV1 = { type: 'project-created-v1', data: projectCreatedEventDataV1 }
    eventStore.append(`project-aggregate-${someId}`, [projectCreatedEventV1], -1);

    return {};
  }
}

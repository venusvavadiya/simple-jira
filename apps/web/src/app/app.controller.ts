import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from './event-store-db.event-store';
import { ProjectCreatedV1Event } from './project-created-v1.event';
import { ProjectRenamedV1Event } from './project-renamed-v1.event';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    try{
      const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
      const eventStore = new EventStoreDBEventStore(client);

      const someId = 'other-id2';

      // const projectCreatedEventV1 = new ProjectCreatedV1Event(someId);
      const projectRenamedEventV1 = new ProjectRenamedV1Event(someId, 'Project Name 2');

      await eventStore.append(`project-aggregate-${someId}`, [projectRenamedEventV1], 3);
    } catch (e) {
      console.log(e);
    }

    return {};
  }
}

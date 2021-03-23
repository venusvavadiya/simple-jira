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
    try {
      const className = 'ProjectCreatedV1Event';
      const e = global[className];
      console.log(e);

      // const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
      // const eventStore = new EventStoreDBEventStore(client);
      //
      // const someId = 'some-id';

      // const projectCreatedEventV1 = new ProjectCreatedV1Event(someId);
      // await eventStore.append(`project-aggregate-${someId}`, [projectCreatedEventV1], -1);
      //
      // const projectRenamedEventV1 = new ProjectRenamedV1Event(someId, 'Test project');
      // await eventStore.append(`project-aggregate-${someId}`, [projectRenamedEventV1], 0);

      // const projectRenamedEventV12 = new ProjectRenamedV1Event(someId, 'Test project updated');
      // await eventStore.append(`project-aggregate-${someId}`, [projectRenamedEventV12], 2);
    } catch (e) {
      console.log(e);
    }

    return {};
  }
}

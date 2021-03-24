import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from './event-store-db.event-store';
import { ProjectCreatedV1Event } from './project-created-v1.event';
import { ProjectRenamedV1Event } from './project-renamed-v1.event';

@Controller()
export class AppController {

  private display(a:string, b:string):void {
    console.log(a + b);
  }

  private  display(a:number, b:number): void {
    console.log(a);
  }

  @Get()
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    try {
      // const className = 'ProjectCreatedV1Event';
      // const e = global[className];
      // console.log(e);

      const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
      const eventStore = new EventStoreDBEventStore(client);

      const someId = 'id-12345';

      this.display('foo', 'bar');
      this.display(1, 2);

      // const projectCreatedEventV1 = new ProjectCreatedV1Event(someId);
      // await eventStore.append(`project-aggregate-${someId}`, [projectCreatedEventV1], -1);
      //
      const projectRenamedEventV1 = new ProjectRenamedV1Event(someId, 'Test Project New');
      await eventStore.append(`project-aggregate-${someId}`, [projectRenamedEventV1], 0);

      // const projectRenamedEventV12 = new ProjectRenamedV1Event(someId, 'Test project updated');
      // await eventStore.append(`project-aggregate-${someId}`, [projectRenamedEventV12], 2);
    } catch (e) {
      console.log(e);
    }

    return {};
  }
}

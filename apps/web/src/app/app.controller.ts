import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from '@simple-jira/adapter-event-store-db';
import {
  CreateProjectCommandHandler,
  CreateProjectCommand,
  ProjectAggregateRepository,
  RenameProjectCommandHandler,
  RenameProjectCommand,
} from '@simple-jira/domain-project';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  private readonly createProjectCommandHandler: CreateProjectCommandHandler
  private readonly renameProjectCommandHandler: RenameProjectCommandHandler

  constructor() {
    const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
    const eventStore = new EventStoreDBEventStore(client);

    const projectAggRepo = new ProjectAggregateRepository(eventStore);

    this.createProjectCommandHandler = new CreateProjectCommandHandler(projectAggRepo);
    this.renameProjectCommandHandler = new RenameProjectCommandHandler(projectAggRepo);
  }

  @Get()
  async getData() {
    const id = uuidv4();
    await this.createProjectCommandHandler.handle(new CreateProjectCommand(id));
    await this.renameProjectCommandHandler.handle(new RenameProjectCommand(id, 'New Name'));
    return { id };
  }
}

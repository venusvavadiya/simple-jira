import { Module } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from '@simple-jira/adapter-event-store-db';
import {
  CreateProjectCommandHandler,
  ProjectAggregateRepository,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
import { AppController } from './app.controller';

function getProviderConfig<T>(instance: T): { provide: string, useValue: T } {
  const provide = instance.constructor.name;
  const useValue = instance;
  return { provide, useValue };
}

const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
const eventStore = new EventStoreDBEventStore(client);

const projectAggRepo = new ProjectAggregateRepository(eventStore);

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    getProviderConfig(new CreateProjectCommandHandler(projectAggRepo)),
    getProviderConfig(new RenameProjectCommandHandler(projectAggRepo)),
  ],
})
export class AppModule {}

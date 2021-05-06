import { DynamicModule, Module } from '@nestjs/common';
import { EventStore, EventSubscription } from '@points-log/domain-core';
import {
  CreateProjectCommandHandler,
  ProjectAggregateRepository,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
import { AppController } from './app.controller';
import { ProjectAggregateMongoDBEventListener } from './project-aggregate-mongo-db.event-listener';
import { MongoDbRepository } from './mongo-db-repository';

function getProviderConfig<T>(instance: T): { provide: string, useValue: T } {
  const provide = instance.constructor.name;
  const useValue = instance;
  return { provide, useValue };
}

@Module({
  controllers: [AppController],
})
export class AppModule {
  static register(
    eventStore: EventStore,
    eventSubscription: EventSubscription,
    mongoDBClient,
  ): DynamicModule {
    const projectRepository = new MongoDbRepository(mongoDBClient);

    eventSubscription.register(new ProjectAggregateMongoDBEventListener(projectRepository));

    const projectAggRepo = new ProjectAggregateRepository(eventStore);

    const providers = [
      getProviderConfig(new CreateProjectCommandHandler(projectAggRepo)),
      getProviderConfig(new RenameProjectCommandHandler(projectAggRepo)),
    ];

    return { module: AppModule, providers };
  }
}

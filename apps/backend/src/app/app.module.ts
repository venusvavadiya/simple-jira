import { DynamicModule, Module } from '@nestjs/common';
import { EventStore, EventSubscription } from '@points-log/domain-core';
import {
  CreateProjectCommandHandler,
  ProjectAggregateRepository,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
import { AppController } from './app.controller';
import { ProjectAggregateMongoDBEventListener } from './project-aggregate-mongo-db.event-listener';

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
    mongoDB,
  ): DynamicModule {
    const projectsCollection = mongoDB.collection('projects');

    eventSubscription.register(new ProjectAggregateMongoDBEventListener(projectsCollection));

    const projectAggRepo = new ProjectAggregateRepository(eventStore);

    const providers = [
      getProviderConfig(new CreateProjectCommandHandler(projectAggRepo)),
      getProviderConfig(new RenameProjectCommandHandler(projectAggRepo)),
    ];

    return { module: AppModule, providers };
  }
}

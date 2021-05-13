import { DynamicModule, Module } from '@nestjs/common';
import { EventStore, EventSubscription } from '@points-log/domain-core';
import {
  CreateProjectCommandHandler,
  ProjectAggregateEventListener,
  ProjectAggregateRepository,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
import { Db as MongoDB } from 'mongodb';
import { AppController } from './app.controller';
import { MongoDBProjectReadRepository } from '../adapters/mongo-db.project.read-repository';

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
    mongoDB: MongoDB,
  ): DynamicModule {
    const projectReadRepository = new MongoDBProjectReadRepository(mongoDB);

    eventSubscription.register(new ProjectAggregateEventListener(projectReadRepository));

    const projectAggRepo = new ProjectAggregateRepository(eventStore);

    const providers = [
      getProviderConfig(new CreateProjectCommandHandler(projectAggRepo)),
      getProviderConfig(new RenameProjectCommandHandler(projectAggRepo)),
    ];

    return { module: AppModule, providers };
  }
}

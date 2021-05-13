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
import { MongoDBProjectEntityRepository } from '../adapters/mongo-db.project.entity-repository';

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
    const projectEntityRepository = new MongoDBProjectEntityRepository(mongoDB);
    eventSubscription.register(new ProjectAggregateEventListener(projectEntityRepository));

    const projectAggregateRepository = new ProjectAggregateRepository(eventStore);

    const providers = [
      getProviderConfig(new CreateProjectCommandHandler(projectAggregateRepository)),
      getProviderConfig(new RenameProjectCommandHandler(projectAggregateRepository)),
    ];

    return { module: AppModule, providers };
  }
}

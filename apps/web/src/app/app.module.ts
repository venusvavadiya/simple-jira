import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EventStore, EventSubscription } from '@points-log/domain-core';
import {
  CreateProjectCommandHandler,
  ProjectAggregateRepository,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
import { AppController } from './app.controller';
import { ProjectAggregateMongoDBEventListener } from './project-aggregate-mongo-db.event-listener';
import { ProjectsResolver } from './projects.resolver';

function getProviderConfig<T>(instance: T): { provide: string, useValue: T } {
  const provide = instance.constructor.name;
  const useValue = instance;
  return { provide, useValue };
}

@Module({
  controllers: [AppController],
  providers: [ProjectsResolver],
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      path: 'projects',
    }),
  ],
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

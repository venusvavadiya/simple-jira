import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBEventSubscription } from '@simple-jira/adapter-event-store-db';
import { AppModule } from './app/app.module';
import { environment } from './environment';
import { ProjectAggregateMongoDBEventListener } from './app/project-aggregate-mongo-db.event-listener';

async function bootstrap() {
  const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  const subscription = new EventStoreDBEventSubscription(client);
  subscription.register(new ProjectAggregateMongoDBEventListener());

  const app = await NestFactory.create(AppModule.register());
  const { port } = environment;
  await app.listen(port);
}

bootstrap().then();

import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBEventStore, EventStoreDBEventSubscription } from '@simple-jira/adapter-event-store-db';
import { MongoClient } from 'mongodb';
import { AppModule } from './app/app.module';
import { environment } from './environment';

async function bootstrap() {
  const mongoClient = new MongoClient('mongodb://root:root@localhost:27017', { useNewUrlParser: true });
  await mongoClient.connect();

  const eventStoreDBClient = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');

  const app = await NestFactory.create(AppModule.register(
    new EventStoreDBEventStore(eventStoreDBClient),
    new EventStoreDBEventSubscription(eventStoreDBClient),
    mongoClient.db('simple-jira'),
  ));
  const { port } = environment;
  await app.listen(port);
}

bootstrap().then();

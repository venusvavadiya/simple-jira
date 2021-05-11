import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBEventStore, EventStoreDBEventSubscription } from '@points-log/adapter-event-store-db';
import { MongoClient } from 'mongodb';
import { AppModule } from './app/app.module';

async function getMongoDBClient(url: string): Promise<MongoClient> {
  const useNewUrlParser = true;
  const useUnifiedTopology = true;
  const config = { useNewUrlParser, useUnifiedTopology };
  const client = new MongoClient(url, config);
  await client.connect();
  return client;
}

async function bootstrap(environment) {
  const { eventStoreDBUrl, mongoDBUrl, port } = environment;
  const eventStoreDBClient = EventStoreDBClient.connectionString(eventStoreDBUrl);
  const mongoDBClient = await getMongoDBClient(mongoDBUrl);

  const app = await NestFactory.create(AppModule.register(
    new EventStoreDBEventStore(eventStoreDBClient),
    new EventStoreDBEventSubscription(eventStoreDBClient),
    mongoDBClient.db('simple-jira'),
  ));
  await app.listen(port);
}

const environment = {
  eventStoreDBUrl: 'esdb://localhost:2113?tls=false',
  mongoDBUrl: 'mongodb://root:root@localhost:27017',
  port: 8000,
};

bootstrap(environment).then();

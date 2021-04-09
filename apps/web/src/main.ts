import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBEventStore, EventStoreDBEventSubscription } from '@points-log/adapter-event-store-db';
import { MongoClient } from 'mongodb';
import { AppModule } from './app/app.module';

const environment = {
  eventStoreDBUrl: process.env.EVENT_STORE_DB_URL,
  mongoDBUrl: process.env.MONGO_STORE_DB_URL,
  port: 8000,
};

async function bootstrap() {
  const { eventStoreDBUrl, mongoDBUrl, port } = environment;

  const useNewUrlParser = true;
  const useUnifiedTopology = true;
  const mongoDBConfig = { useNewUrlParser, useUnifiedTopology };
  const mongoDBClient = new MongoClient(mongoDBUrl, mongoDBConfig);
  await mongoDBClient.connect();

  const eventStoreDBClient = EventStoreDBClient.connectionString(eventStoreDBUrl);

  const app = await NestFactory.create(AppModule.register(
    new EventStoreDBEventStore(eventStoreDBClient),
    new EventStoreDBEventSubscription(eventStoreDBClient),
    mongoDBClient.db('simple-jira'),
  ));
  await app.listen(port);
}

bootstrap().then();

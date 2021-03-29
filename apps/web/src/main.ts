import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBEventSubscription } from '@simple-jira/adapter-event-store-db';
import { MongoClient } from 'mongodb';
import { AppModule } from './app/app.module';
import { environment } from './environment';
import { ProjectAggregateMongoDBEventListener } from './app/project-aggregate-mongo-db.event-listener';

async function bootstrap() {
  const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  const subscription = new EventStoreDBEventSubscription(client);

  const mongoClient = new MongoClient('mongodb://root:root@localhost:27017', { useNewUrlParser: true });
  await mongoClient.connect();
  const database = mongoClient.db('simple-jira');
  const projectsCollection = database.collection('projects');

  subscription.register(new ProjectAggregateMongoDBEventListener(projectsCollection));

  const app = await NestFactory.create(AppModule.register());
  const { port } = environment;
  await app.listen(port);
}

bootstrap().then();

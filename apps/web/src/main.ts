import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { MongoClient } from 'mongodb';
import { AppModule } from './app/app.module';
import * as events from './app';

async function bootstrap() {
  const mongoClient = new MongoClient('mongodb://root:root@localhost:27017', { useNewUrlParser: true });
  await mongoClient.connect();
  const database = mongoClient.db('simple-jira');
  const projects = database.collection('projects');

  const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  const prefixes = ['project-aggregate-'];
  const filter = streamNameFilter({ prefixes });
  const subscription = client
    .subscribeToAll({ filter })
    .on('data', async (resolvedEvent) => {
      // console.log(resolvedEvent);
      const e = new events[resolvedEvent.event.type](...Object.values(resolvedEvent.event.data));
      console.log(e);
      const query = { _id: resolvedEvent.event.data.projectId };
      const update = { $set: { name: resolvedEvent.event.data.projectName } };
      await projects.updateOne(query, update, { upsert: true });
    });

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();

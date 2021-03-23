import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { EventStoreDBClient, STREAM_NAME, streamNameFilter } from '@eventstore/db-client';

async function bootstrap() {
  const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  const prefixes = ["project-aggregate-"];
  const filter = streamNameFilter({ prefixes });
  const subscription = client
    .subscribeToAll({ filter })
    .on("data", function (resolvedEvent) {
      console.log(
        `Received event ${resolvedEvent.event.revision}@${resolvedEvent.event.streamId}`
      );
    });

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();

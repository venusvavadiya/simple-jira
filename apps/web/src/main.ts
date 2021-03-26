import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = environment;
  await app.listen(port);
}

bootstrap().then();

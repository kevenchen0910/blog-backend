import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  // TODO: add version control logic
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  return app;
}

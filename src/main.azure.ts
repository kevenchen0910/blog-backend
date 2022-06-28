import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  // TODO: add version control logic
  app.setGlobalPrefix('api');

  await app.init();

  return app;
}

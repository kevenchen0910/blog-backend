import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(async function main() {
  const { PORT, HOST } = process.env;
  const port = Number(PORT) || 8000;
  const host = HOST || '0.0.0.0';
  const app = await NestFactory.create(AppModule);

  // start listening
  await app.listen(port, host);

  // log server url
  console.info(`Application is running on: ${await app.getUrl()}`);
}());

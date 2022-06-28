import { createApp } from './main.azure';

(async function bootstrap() {
  const { PORT, HOST } = process.env;
  const port = Number(PORT) || 8000;
  const host = HOST || '0.0.0.0';
  const app = await createApp();

  await app.listen(port, host);

  // log server url
  console.info(`Application is running on: ${await app.getUrl()}`);
}());

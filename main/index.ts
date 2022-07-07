import { Context, HttpRequest } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';

import { createApp } from '../src/app';

export default function main(context: Context, req: HttpRequest): void {
  AzureHttpAdapter.handle(createApp, context, req);
}

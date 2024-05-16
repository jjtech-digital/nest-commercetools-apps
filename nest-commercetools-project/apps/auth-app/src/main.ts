import * as dotenv from 'dotenv';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import { AuthAppModule } from './auth-app.module';

dotenv.config();

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AuthAppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  await app.init();

  // Create an express app
  const expressApp = express();
  expressApp.use('/auth-app', app.getHttpAdapter().getInstance()); // Mount the NestJS app on "/auth-app" route

  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisClientService {
  readonly REDIS_URL: string;
  readonly REDIS_CONNECTION_TIMEOUT: string;

  isConnected: boolean;
  readonly redisClient: RedisClientType;

  constructor() {
    this.REDIS_URL = process.env.REDIS_URL;
    this.REDIS_CONNECTION_TIMEOUT = process.env.REDIS_CONNECTION_TIMEOUT;
    this.isConnected = false;

    this.redisClient = createClient({
      url: this.REDIS_URL,
    });
    this.redisClient
      .connect()
      .then(() => {
        console.log('Redis client is connected.');
        this.isConnected = true;
      })
      .catch((error) => {
        console.log('Error connecting redis', error);
      });
  }
}

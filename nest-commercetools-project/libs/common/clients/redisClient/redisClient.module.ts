import { Module } from '@nestjs/common';
import { RedisClientService } from './redisClient.services';

@Module({
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}

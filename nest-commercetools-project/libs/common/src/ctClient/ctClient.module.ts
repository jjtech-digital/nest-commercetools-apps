import { Module } from '@nestjs/common';
import { CtClientService } from './ctClient.services';

@Module({
  providers: [CtClientService],
  exports: [CtClientService],
})
export class CtClientModule {}

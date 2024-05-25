import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { CtClientModule } from '../../../libs/common/clients';
@Module({
  imports: [CtClientModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}

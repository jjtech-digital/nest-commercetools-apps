import { Module } from '@nestjs/common';
import { ProductAppController } from './product-app.controller';
import { ProductAppService } from './product-app.service';
import { CtClientModule } from '../../../libs/common/src/ctClient/ctClient.module';

@Module({
  imports: [CtClientModule],
  controllers: [ProductAppController],
  providers: [ProductAppService],
})
export class ProductAppModule {}

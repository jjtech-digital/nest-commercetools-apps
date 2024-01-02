import { Module } from '@nestjs/common';
import { ProductAppController } from './product-app.controller';
import { ProductAppService } from './product-app.service';

@Module({
  imports: [],
  controllers: [ProductAppController],
  providers: [ProductAppService],
})
export class ProductAppModule {}

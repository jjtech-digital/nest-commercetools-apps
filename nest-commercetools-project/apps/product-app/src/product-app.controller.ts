import { Controller, Get } from '@nestjs/common';
import { ProductAppService } from './product-app.service';
import { Product } from '@commercetools/platform-sdk';

@Controller()
export class ProductAppController {
  constructor(private readonly productAppService: ProductAppService) {}

  @Get()
  getTotalProducts(): Promise<{
    statusCode: number;
    totalCustomer: number;
    customers: Product[];
  }> {
    return this.productAppService.getTotalProducts();
  }
}

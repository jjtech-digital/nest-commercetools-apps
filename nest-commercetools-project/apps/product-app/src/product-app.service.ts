import { Inject, Injectable } from '@nestjs/common';
import {
  Product,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { CtClientService } from '../../../libs/common/clients';
import { CacheablePromise } from '../../../libs/common/utils';

@Injectable()
export class ProductAppService {
  @Inject(CtClientService)
  private readonly ctClientService: CtClientService;

  private async getAllProductFromCt(): Promise<{
    statusCode: number;
    body: ProductPagedQueryResponse;
  }> {
    return new CacheablePromise('all_products', 1200, async (resolve) => {
      const { statusCode, body } = await this.ctClientService
        .withProjectKey()
        .products()
        .get()
        .execute();
      resolve({ statusCode, body });
    });
  }

  async getTotalProducts(): Promise<{
    statusCode: number;
    totalCustomer: number;
    customers: Product[];
  }> {
    const { statusCode, body } = await this.getAllProductFromCt();
    return {
      statusCode,
      totalCustomer: body.total,
      customers: body.results,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CtClientService } from '../../../libs/common/src/ctClient/ctClient.services';
import { Product } from '@commercetools/platform-sdk';

@Injectable()
export class ProductAppService {
  @Inject(CtClientService)
  private readonly ctClientService: CtClientService;

  async getTotalProducts(): Promise<{
    statusCode: number;
    totalCustomer: number;
    customers: Product[];
  }> {
    const { statusCode, body } = await this.ctClientService
      .withProjectKey()
      .products()
      .get()
      .execute();
    const response = {
      statusCode,
      totalCustomer: body.total,
      customers: body.results,
    };
    return response;
  }
}

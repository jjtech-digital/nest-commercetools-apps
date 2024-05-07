import { Inject, Injectable } from '@nestjs/common';
import { CtClientService } from '../../../libs/common/src/ctClient/ctClient.services';

@Injectable()
export class ProductAppService {
  @Inject(CtClientService)
  private readonly ctClientService: CtClientService;

  async getTotalProducts(): Promise<object> {
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

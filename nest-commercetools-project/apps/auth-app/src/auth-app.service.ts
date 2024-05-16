import { Inject, Injectable } from '@nestjs/common';
import { CtClientService } from '../../../libs/common/src/ctClient/ctClient.services';
import { Customer } from '@commercetools/platform-sdk';

@Injectable()
export class AuthAppService {
  @Inject(CtClientService)
  private readonly ctClientService: CtClientService;

  async getTotalCustomers(): Promise<{
    statusCode: number;
    totalCustomer: number;
    customers: Customer[];
  }> {
    const { statusCode, body } = await this.ctClientService
      .withProjectKey()
      .customers()
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

import { Inject, Injectable } from '@nestjs/common';
import {
  Customer,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { CtClientService } from '../../../libs/common/clients';
import { CacheablePromise } from '../../../libs/common/utils';

@Injectable()
export class AuthAppService {
  @Inject(CtClientService)
  private readonly ctClientService: CtClientService;

  private async getAllCustomerFromCt(): Promise<{
    statusCode: number;
    body: CustomerPagedQueryResponse;
  }> {
    return new CacheablePromise('all_customer', 1200, async (resolve) => {
      const { statusCode, body } = await this.ctClientService
        .withProjectKey()
        .customers()
        .get()
        .execute();
      resolve({ statusCode, body });
    });
  }

  async getTotalCustomers(): Promise<{
    statusCode: number;
    totalCustomer: number;
    customers: Customer[];
  }> {
    const { statusCode, body } = await this.getAllCustomerFromCt();

    return {
      statusCode: statusCode,
      totalCustomer: body.total,
      customers: body.results,
    };
  }
}

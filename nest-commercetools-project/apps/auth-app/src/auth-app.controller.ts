import { Controller, Get } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';
import { Customer } from '@commercetools/platform-sdk';

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Get()
  getTotalCustomers(): Promise<{
    statusCode: number;
    totalCustomer: number;
    customers: Customer[];
  }> {
    return this.authAppService.getTotalCustomers();
  }
}

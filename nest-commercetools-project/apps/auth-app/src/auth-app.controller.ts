import { Controller, Get } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Get()
  getTotalCustomers(): Promise<object> {
    return this.authAppService.getTotalCustomers();
  }
}

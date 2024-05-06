import { Inject, Injectable } from '@nestjs/common';
import { CtClientService } from '../../../libs/common/src/ctClient/ctClient.services';

@Injectable()
export class AuthAppService {
  @Inject(CtClientService)
  private readonly ctClientService: CtClientService;

  getHello(): string {
    return 'auth-app Hello World!';
  }
}

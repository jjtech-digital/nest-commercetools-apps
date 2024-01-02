import { Injectable } from '@nestjs/common';
import { } from '@app/common'

@Injectable()
export class ProductAppService {
  getHello(): string {
    return 'Hello World!';
  }
}

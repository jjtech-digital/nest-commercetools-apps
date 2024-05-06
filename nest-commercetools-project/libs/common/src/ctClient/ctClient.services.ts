import { Injectable } from '@nestjs/common';

@Injectable()
export class CtClientService {
  root: any;
  CT_API_URL: string;
  CT_PROJECT_KEY: string;
  CT_AUTH_URL: string;
  CT_CLIENT_ID: string;
  CT_CLIENT_SECRET: string;
  scope: string;
}

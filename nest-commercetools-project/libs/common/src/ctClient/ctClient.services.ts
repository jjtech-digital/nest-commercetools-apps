import { Injectable } from '@nestjs/common';
import {
  ClientBuilder,
  createAuthForClientCredentialsFlow,
  createAuthWithExistingToken,
  createHttpClient,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

@Injectable()
export class CtClientService {
  root: ApiRoot;
  CT_API_URL: string;
  CT_PROJECT_KEY: string;
  CT_AUTH_URL: string;
  CT_CLIENT_ID: string;
  CT_CLIENT_SECRET: string;
  scope: string;

  constructor() {
    this.CT_AUTH_URL = process.env.CT_AUTH_URL;
    this.CT_PROJECT_KEY = process.env.CT_PROJECT_KEY;
    this.CT_API_URL = process.env.CT_API_URL;
    this.CT_CLIENT_ID = process.env.CT_CLIENT_ID;
    this.CT_CLIENT_SECRET = process.env.CT_CLIENT_SECRET;

    // this.scope = `view_stores:${this.CT_PROJECT_KEY} manage_my_payments:${this.CT_PROJECT_KEY} manage_my_orders:${this.CT_PROJECT_KEY} view_tax_categories:${this.CT_PROJECT_KEY} create_anonymous_token:${this.CT_PROJECT_KEY} view_categories:${this.CT_PROJECT_KEY} manage_my_quotes:${this.CT_PROJECT_KEY} introspect_oauth_tokens:${this.CT_PROJECT_KEY} manage_my_shopping_lists:${this.CT_PROJECT_KEY} view_products:${this.CT_PROJECT_KEY} manage_my_quote_requests:${this.CT_PROJECT_KEY} view_types:${this.CT_PROJECT_KEY} manage_my_business_units:${this.CT_PROJECT_KEY} manage_my_profile:${this.CT_PROJECT_KEY}`;
    this.scope = `manage_project:${this.CT_PROJECT_KEY}`;

    const authMiddlewareOptions = {
      host: this.CT_AUTH_URL,
      projectKey: this.CT_PROJECT_KEY,
      credentials: {
        clientId: this.CT_CLIENT_ID as string,
        clientSecret: this.CT_CLIENT_SECRET as string,
      },
      oauthUri: '/oauth/token',
      scopes: [this.scope],
      fetch,
    };

    const httpMiddlewareOptions = {
      host: this.CT_API_URL,
      fetch,
    };

    const client = new ClientBuilder()
      .withProjectKey(this.CT_PROJECT_KEY)
      .withMiddleware(createAuthForClientCredentialsFlow(authMiddlewareOptions))
      .withMiddleware(createHttpClient(httpMiddlewareOptions))
      .withUserAgentMiddleware()
      .build();

    this.root = createApiBuilderFromCtpClient(client);
  }

  withProjectKey() {
    return this.root.withProjectKey({
      projectKey: this.CT_PROJECT_KEY as string,
    });
  }

  meClient(token: string) {
    try {
      const httpMiddlewareOptions = {
        host: this.CT_API_URL,
        fetch,
        scopes: [this.scope],
      };
      const projectKey = this.CT_PROJECT_KEY as string;
      const client = new ClientBuilder()
        .withProjectKey(projectKey)
        .withMiddleware(createAuthWithExistingToken(token))
        .withMiddleware(createHttpClient(httpMiddlewareOptions))
        .withUserAgentMiddleware()
        .build();

      return createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey,
      });
    } catch (error) {
      throw error;
    }
  }

  async request<T>({
    query,
    variables,
  }: {
    query: string;
    variables: Record<string, unknown>;
  }): Promise<T> {
    const response = await this.withProjectKey()
      .graphql()
      .post({
        body: {
          query,
          variables,
        },
      })
      .execute();
    const data: T = response.body.data;
    return data;
  }
}

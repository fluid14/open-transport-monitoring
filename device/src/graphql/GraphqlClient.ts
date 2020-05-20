import fetch from 'node-fetch';
import gql from 'graphql-tag';

import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { AUTH_TYPE } from 'aws-appsync';

import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DEVICE_API_URL, DEVICE_API_REGION, DEVICE_API_KEY } from '../../config';

class GraphqlClient {

  private client: ApolloClient<any>;

  constructor() {
    const url = DEVICE_API_URL;
    const region = DEVICE_API_REGION;
    const auth = {
      type: AUTH_TYPE.API_KEY,
      apiKey: DEVICE_API_KEY
    } as any;

    const httpLink = createHttpLink({ uri: url, fetch });

    const link = ApolloLink.from([
      createAuthLink({ url, region, auth }),
      createSubscriptionHandshakeLink(url, httpLink)
    ]);

    this.client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache"
        }
      }
    })
  }

  public async query<T>(query: string, dataProperty: string): Promise<T>  {
    const results = await this.client.query({ query: gql(query) });

    return results.data[dataProperty];
  }

  public subscription(query: string): any {
    return this.client.subscribe({ query: gql(query) });
  }

}

export default GraphqlClient;

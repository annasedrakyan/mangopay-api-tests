import { request, APIRequestContext } from '@playwright/test';
import { config } from '../config/config';
import testData from '../testData.json';

export async function getBearerToken(): Promise<string> {
  const credentials = `${config.clientId}:${config.apiKey}`;
  
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  const apiContext = await request.newContext({
    baseURL: config.baseURL,
    extraHTTPHeaders: {
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const response = await apiContext.post('/v2.01/oauth/token', {
    data: 'grant_type=client_credentials'
  });

  if (response.status() !== 200) {
    throw new Error(`Failed to get Bearer token: ${response.statusText()}`);
  }

  const responseBody = await response.json();
  
  // Return the Bearer token
  console.log(responseBody.access_token)
  return responseBody.access_token;
}

export async function createApiContext(): Promise<APIRequestContext> {
    const token = await getBearerToken();
    return request.newContext({
      baseURL: 'https://api.sandbox.mangopay.com',
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

export async function createUser(apiContext: any, userData: any): Promise<any> {
    const userResponse = await apiContext.post(`/v2.01/qatechtest/users/natural`, {
        data: {
            ...userData,
          },
    });
  
    return userResponse;
  }
  
  export async function createWallet(apiContext: any, walletData: any) {
    const walletResponse = await apiContext.post(`/v2.01/qatechtest/wallets`, {
      data: {
        ...walletData,
      },
    });
  
    return walletResponse;
  }
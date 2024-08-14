import { test, expect, request } from '@playwright/test';
import { createApiContext, createUser, createWallet, getBearerToken } from '../commons/requests';
import testData from '../testData.json';


test.describe('Create valid wallet for an existing User', () => {

  test('should create a valid wallet for an existing user and check its properties', async () => {
  const apiContext = await createApiContext();
  const response = await createUser(apiContext, testData.validPayerUser);
  const responseBody = await response.json();

  const validWallet = {
    ...testData.wallet,
    Owners: [responseBody.Id],
  };

  const walletResponse = await createWallet(apiContext, validWallet);

  expect(walletResponse.status()).toBe(200);
  const wallet = await walletResponse.json();

  // Validate wallet properties
  expect(wallet).toHaveProperty('Id');
  expect(wallet.Description).toBe('Customer wallet');
  expect(wallet.Owners).toContain(responseBody.Id);
  expect(wallet.Currency).toBe('EUR');
  expect(wallet).toHaveProperty('FundsType', 'DEFAULT');
  expect(wallet.Tag).toBe('Wallet for Hugo Garnier');
  expect(wallet.CreationDate).toBeGreaterThan(0);
  expect(wallet.Balance).toHaveProperty('Currency', 'EUR');
  expect(wallet.Balance).toHaveProperty('Amount', 0);

});

  test('should return an error for invalid currency code', async () => {
    const apiContext = await createApiContext();
    const userId = await createUser(apiContext, testData.validPayerUser);

    const invalidWalletData = {
      ...testData.wallet,
      Owners: [userId],
      Currency: 'XYZ', // Invalid currency code
    };

    const walletResponse = await createWallet(apiContext, invalidWalletData);

    expect(walletResponse.status()).toBe(400);
    const error = await walletResponse.json();
    expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
  });

        test('should return an error when Owners field is missing', async () => {
          const apiContext = await createApiContext();
      
          const invalidWalletData = {
            ...testData.wallet,
            Owners: [], 
          };
        
          const walletResponse = await createWallet(apiContext, invalidWalletData);
        
          expect(walletResponse.status()).toBe(400);
          const error = await walletResponse.json();
          expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
        });


  test('should return an error when multiple owners are provided', async () => {
      const apiContext = await createApiContext();
      const userId_1 = await createUser(apiContext, testData.validPayerUser);
      const userId_2 = await createUser(apiContext, testData.validPayerUser);
      
      const invalidWalletData = {
        ...testData.wallet,
        Owners: [userId_1, userId_2]
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(400);
      const error = await walletResponse.json();
      expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
    });

    test('should return an error for invalid owner ID', async () => {
      const apiContext = await createApiContext();

      const invalidWalletData = {
        ...testData.wallet,
        Owners: ['invalidUserId'], // Invalid owner ID
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(400);
      const error = await walletResponse.json();
      expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
    });

    test('should description is mandatory for creating a wallet', async () => {
      const apiContext = await createApiContext();
      const userId = await createUser(apiContext, testData.validPayerUser);

      const invalidWalletData = {
        ...testData.wallet,
        Owners: [userId],
        Description: '', 
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(400);
      const error = await walletResponse.json();
      expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
    });

    test('should currency is mandatory for creating a wallet', async () => {
      const apiContext = await createApiContext();
      const userId = await createUser(apiContext, testData.validPayerUser);

      const invalidWalletData = {
        ...testData.wallet,
        Owners: [userId],
        Currency: '', 
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(400);
      const error = await walletResponse.json();
      expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
    });

    test('should return error if currency is not a string', async () => {
      const apiContext = await createApiContext();
      const userId = await createUser(apiContext, testData.validPayerUser);

      const invalidWalletData = {
        ...testData.wallet,
        Owners: [userId],
        Description: { text: "Invalid" }, // I guess here BE is parsing any value to a string if possible, but not object 
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(400);
      const error = await walletResponse.json();
    
      expect(error).toHaveProperty('Message', 'One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
    });

    test('should return error if currency is number', async () => {
      const apiContext = await createApiContext();
      const response = await createUser(apiContext, testData.validPayerUser);
      const responseBody = await response.json();


      const invalidWalletData = {
        ...testData.wallet,
        Owners: [responseBody.Id],
        Description: 12345, 
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(200);
      const wallet = await walletResponse.json();
      expect(wallet.Description).toBe('12345');
    });

    test('should return error if currency is boolean', async () => {
      const apiContext = await createApiContext();
      const response = await createUser(apiContext, testData.validPayerUser);
      const responseBody = await response.json();

      const invalidWalletData = {
        ...testData.wallet,
        Owners: [responseBody.Id],
        Description: true, 
      };
    
      const walletResponse = await createWallet(apiContext, invalidWalletData);
    
      expect(walletResponse.status()).toBe(200);
      const wallet = await walletResponse.json();
      expect(wallet.Description).toBe('true');
    });
});

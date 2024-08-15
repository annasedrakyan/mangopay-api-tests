import { test, expect } from '@playwright/test';
import { createApiContext, createUser, fetchExistingUserIds } from '../commons/requests';
import testData from '../testData.json';


  test.describe('Create Natural User', () => {
  test('should create a new Payer user successfully', async () => {

    const apiContext = await createApiContext();

    const response = await createUser(apiContext, testData.validPayerUser);
  
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('Id');

    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty('Id');
    expect(responseBody.FirstName).toBe('Hugo');
    expect(responseBody.LastName).toBe('Garnier');
    expect(responseBody.Email).toBe('email@test.com');
    expect(responseBody.UserCategory).toBe('PAYER');
    console.log('User ID:', responseBody.Id);
  });

  test('should create a new Owner user and ensure user ID is unique', async () => {
    const apiContext = await createApiContext();

    const existingIds = await fetchExistingUserIds(apiContext);
  
    const response = await createUser(apiContext, testData.validOwnerUser);

    const responseBody = await response.json();
    
    const userId = responseBody.Id;
  
    // Check that the new User ID is unique
    expect(existingIds).not.toContain(userId);  
  });
  
  test('should create a new Owner user successfully', async () => {
  
      const apiContext = await createApiContext();
  
      const response = await createUser(apiContext, testData.validOwnerUser);
    
      expect(response.status()).toBe(200);
  
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty('Id');
  
      expect(response.status()).toBe(200);
  
      expect(responseBody).toHaveProperty('Id');
      expect(responseBody.FirstName).toBe('Hugo');
      expect(responseBody.LastName).toBe('Garnier');
      expect(responseBody.Email).toBe('email@test.com');
      expect(responseBody.UserCategory).toBe('OWNER');
      console.log('User ID:', responseBody.Id);
    });

  test('should return 400 if FirstName is missing', async () => {
   
    const apiContext = await createApiContext();
  
    const response = await createUser(apiContext, testData.missingFirstName);
  
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.Message).toContain('One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
  });
  
  test('should return 400 for invalid country code', async () => {
    const apiContext = await createApiContext();
  
    const response = await createUser(apiContext, testData.invalidCountryCode);

    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.Message).toContain('One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
  });

  test('should return 400 for invalid UserCategory', async () => {
    
    const apiContext = await createApiContext();
  
    const response = await createUser(apiContext, testData.invalidUserCategory);

  
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.Message).toContain('One or several required parameters are missing or incorrect. An incorrect resource ID also raises this kind of error.');
  });
});



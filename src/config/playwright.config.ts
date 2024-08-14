import { defineConfig } from '@playwright/test';
const { AllureReporter } = require('allure-playwright');

export default defineConfig({
  testDir: './src/tests', 
  timeout: 30 * 1000, // Maximum time one test can run
  expect: {
    timeout: 5000, // Maximum time expect() should wait for an assertion to pass
  },
  fullyParallel: true, 
  retries: 1, 
  workers: process.env.CI ? 1 : undefined, 
  reporter: [
    [AllureReporter, { outputFolder: 'allure-results' }]
  ],
});
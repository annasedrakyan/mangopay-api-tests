import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests', // Directory where your tests are located
  timeout: 30 * 1000, // Maximum time one test can run
  expect: {
    timeout: 5000, // Maximum time expect() should wait for an assertion to pass
  },
  fullyParallel: true, // Runs all tests in parallel (as many as the number of workers)
  retries: 1, // Retries failed tests
  workers: process.env.CI ? 1 : undefined, // Use single worker in CI, or default (based on available cores)
//   use: {
//     baseURL: 'https://sandbox.api.mangopay.com', // Your base URL for the API
//     trace: 'on-first-retry', // Trace only on retry to investigate test failures
//   },
   reporter: [
    ['html', { open: 'on-failure' }],
    ['allure-playwright'],
  ],
});
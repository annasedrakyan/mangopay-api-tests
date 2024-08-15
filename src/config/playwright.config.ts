import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests', 
  timeout: 30 * 1000, // Maximum time one test can run
  expect: {
    timeout: 5000, // Maximum time expect() should wait for an assertion to pass
  },
  fullyParallel: true, 
  retries: 1, 
  workers: process.env.CI ? 2 : undefined, 
 reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

});
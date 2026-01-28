import { defineConfig, devices } from '@playwright/test';

import { ENV } from './config/environment.js'; 

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
 
    baseURL: ENV.BASE_URL,

    
    extraHTTPHeaders: {
      'Authorization': `Basic ${Buffer.from(`${ENV.HTTP_USER}:${ENV.HTTP_PASSWORD}`).toString('base64')}`,
    },

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
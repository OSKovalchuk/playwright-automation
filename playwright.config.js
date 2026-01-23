import { defineConfig, devices } from '@playwright/test';

import { ENV } from './config/environment.js';

export default defineConfig({
  testDir: './tests',
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
  ],
});
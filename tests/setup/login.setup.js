import { test as setup, expect } from '@playwright/test';
import { ENV } from '../../config/environment.js';

const storagePath = 'playwright/.auth/user.json';

setup('authenticate as user', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signinEmail').fill(ENV.HTTP_USER_EMAIL); 
  await page.locator('#signinPassword').fill(ENV.HTTP_USER_PASSWORD); 
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*garage/);

  // Зберігаємо стан авторизації
  await page.context().storageState({ path: storagePath });
});
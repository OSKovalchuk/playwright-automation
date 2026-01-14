import { test, expect } from '@playwright/test';

test.describe('Registration Form Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test('Success registration with valid data', async ({ page }) => {
    const timestamp = Date.now();
    await page.locator('#signupName').fill('Artem');
    await page.locator('#signupLastName').fill('Tester');
    await page.locator('#signupEmail').fill(`aqa-user${timestamp}@test.com`);
    await page.locator('#signupPassword').fill('Password123');
    await page.locator('#signupRepeatPassword').fill('Password123');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL(/.*garage/);
  });

  test('Error when Name field is empty', async ({ page }) => {
    const nameInput = page.locator('#signupName');
    await nameInput.focus();
    await nameInput.blur(); 
    // Виправлено на "Name required"
    await expect(page.locator('#signupName + .invalid-feedback')).toHaveText('Name required');
  });

  test('Error when Name is too short', async ({ page }) => {
    await page.locator('#signupName').fill('A');
    await page.locator('#signupName').blur();
    await expect(page.locator('#signupName + .invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('Error when Email is incorrect', async ({ page }) => {
    await page.locator('#signupEmail').fill('invalid-email');
    await page.locator('#signupEmail').blur();
    await expect(page.locator('#signupEmail + .invalid-feedback')).toHaveText('Email is incorrect');
  });

test('Error when Passwords do not match', async ({ page }) => {
    
    await page.locator('#signupPassword').fill('Password123'); 
    
 
    await page.locator('#signupRepeatPassword').fill('Password456'); 
    await page.locator('#signupRepeatPassword').blur();

    
    await expect(page.locator('#signupRepeatPassword + .invalid-feedback'))
      .toHaveText('Passwords do not match');
  });

  test('Register button is disabled when data is invalid', async ({ page }) => {
    await page.locator('#signupName').fill('1'); 
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });
});
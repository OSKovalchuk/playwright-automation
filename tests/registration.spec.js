// tests/registration.spec.js
import { test, expect } from '@playwright/test';
// Імпортуємо ваш Page Object (переконайтеся, що файл .js існує)
import { RegistrationPage } from '../PageObjects/RegistrationPage.js';

test.describe('Registration Form Tests (JavaScript)', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    // Створюємо екземпляр класу без вказання типу
    registrationPage = new RegistrationPage(page);
    await registrationPage.openRegistrationForm();
  });

  test('Success registration with valid data', async ({ page }) => {
    const timestamp = Date.now();
    await registrationPage.fillRegistrationForm({
      name: 'Artem',
      lastName: 'Tester',
      email: `aqa-user${timestamp}@test.com`, // Вимога: префікс aqa
      password: 'Password123',
      repeatPassword: 'Password123'
    });
    
    await registrationPage.registerButton.click();
    await expect(page).toHaveURL(/.*garage/);
  });

  test('Error when Name field is empty', async () => {
    await registrationPage.nameInput.focus();
    await registrationPage.nameInput.blur(); 
    
    await expect(registrationPage.nameError).toHaveText('Name required');
  });

  test('Error when Name is too short', async () => {
    await registrationPage.nameInput.fill('A');
    await registrationPage.nameInput.blur();
    await expect(registrationPage.nameError).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('Error when Email is incorrect', async () => {
    await registrationPage.emailInput.fill('invalid-email');
    await registrationPage.emailInput.blur();
    
    const emailError = registrationPage.page.locator('#signupEmail + .invalid-feedback');
    await expect(emailError).toHaveText('Email is incorrect');
  });

  test('Error when Passwords do not match', async () => {
    await registrationPage.fillRegistrationForm({
      password: 'Password123',
      repeatPassword: 'Password456' 
    });
    await registrationPage.repeatPasswordInput.blur();

    const mismatchError = registrationPage.page.locator('#signupRepeatPassword + .invalid-feedback');
    await expect(mismatchError).toHaveText('Passwords do not match');
  });

  test('Register button is disabled when data is invalid', async () => {
    await registrationPage.nameInput.fill('1'); 
    await expect(registrationPage.registerButton).toBeDisabled();
  });
});
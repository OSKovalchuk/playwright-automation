// pageObjects/RegistrationPage.ts
import { Locator, Page, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly signupButton: Locator;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly nameError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    
    // Локатори для помилок через сусідній селектор (+)
    this.nameError = page.locator('#signupName + .invalid-feedback');
  }

  async openRegistrationForm() {
    await this.page.goto('/');
    await this.signupButton.click();
  }

  async fillRegistrationForm(data: { name?: string, lastName?: string, email?: string, password?: string, repeatPassword?: string }) {
    if (data.name) await this.nameInput.fill(data.name);
    if (data.lastName) await this.lastNameInput.fill(data.lastName);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.password) await this.passwordInput.fill(data.password);
    if (data.repeatPassword) await this.repeatPasswordInput.fill(data.repeatPassword);
  }
}
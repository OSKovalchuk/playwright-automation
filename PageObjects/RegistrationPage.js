// PageObjects/RegistrationPage.js
export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    
    
    this.nameError = page.locator('#signupName + .invalid-feedback');
    this.lastNameError = page.locator('#signupLastName + .invalid-feedback');
    this.emailError = page.locator('#signupEmail + .invalid-feedback');
    this.passwordError = page.locator('#signupPassword + .invalid-feedback');
    this.repeatPasswordError = page.locator('#signupRepeatPassword + .invalid-feedback');
  }

  async openRegistrationForm() {
    await this.page.goto('/');
    await this.signupButton.click();
  }

  async fillRegistrationForm(data) {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.password !== undefined) await this.passwordInput.fill(data.password);
    if (data.repeatPassword !== undefined) await this.repeatPasswordInput.fill(data.repeatPassword);
  }
}
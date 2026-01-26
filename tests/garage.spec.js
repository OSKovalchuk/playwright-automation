import { test, expect } from '../fixtures/userGarage.js';

test.describe('Garage Tests with Fixture', () => {
  test('should see garage title when logged in', async ({ userGaragePage }) => {
    // Юзер уже залогінений завдяки фікстурі
    await expect(userGaragePage.garageTitle).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeEnabled();
  });
});
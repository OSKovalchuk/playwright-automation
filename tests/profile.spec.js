import { test, expect } from '../fixtures/userGarage.js';

test.describe('Profile Mocking', () => {
  test('should display mocked user data on profile page', async ({ userGaragePage }) => {
    const { page } = userGaragePage; // Отримуємо сторінку з нашої фікстури

    const mockedUserData = {
      "status": "ok",
      "data": {
        "userId": 99999,
        "photoFilename": "default-user.png",
        "name": "Gemini",
        "lastName": "Adaptive"
      }
    };

    // Підміняємо API відповідь ПЕРЕД переходом
    await page.route('**/api/users/profile', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedUserData),
      });
    });

    // Переходимо безпосередньо в профіль
    await page.goto('/panel/profile');

    // Чекаємо саме на підмінені дані
    const profileName = page.locator('.profile_name');
    await expect(profileName).toBeVisible();
    await expect(profileName).toHaveText('Gemini Adaptive');
  });
});
import { test, expect } from '@playwright/test';

test.describe('API Cars Controller', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    // Створюємо контекст з готовими кукі 
    apiContext = await playwright.request.newContext({
      storageState: 'playwright/.auth/user.json',
      baseURL: 'https://qauto.forstudy.space'
    });
  });

  // 1. Позитивний сценарій
  test('should create a new car via API', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 123
      }
    });
    
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.data.mileage).toBe(123);
    expect(body.data).toHaveProperty('id');
  });

  // 2. Негативний сценарій: невалідний бренд
  test('should not create a car with invalid brand ID', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        "carBrandId": 999, // неіснуючий ID
        "carModelId": 1,
        "mileage": 100
      }
    });

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toBe('Brand not found');
  });

  // 3. Негативний сценарій: відсутні обов'язкові поля
  test('should not create a car without mileage', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        "carBrandId": 1,
        "carModelId": 1
        // mileage відсутній
      }
    });

    expect(response.status()).toBe(400);
  });
});
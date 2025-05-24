import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login feature', () => {
  test('successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error('USERNAME or PASSWORD environment variable is not set');
    }
    await loginPage.fillUsername(process.env.USERNAME);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLogin();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('unsuccessful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername('invalid_user');
    await loginPage.fillPassword('invalid_password');
    await loginPage.clickLogin();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });
});
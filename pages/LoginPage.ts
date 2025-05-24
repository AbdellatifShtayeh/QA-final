import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillUsername(username: string) {
    await this.page.fill('[data-test="username"]', username);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-test="password"]', password);
  }

  async clickLogin() {
    await this.page.click('[data-test="login-button"]');
  }

  async getErrorMessage() {
    return await this.page.textContent('[data-test="error"]');
  }
}
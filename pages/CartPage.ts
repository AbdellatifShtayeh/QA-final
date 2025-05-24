import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async removeItem(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.click(`[data-test="remove-${slug}"]`);
  }

  async getCartItems() {
    return await this.page.$$eval('[data-test="inventory-item-name"]', elements => elements.map(el => el.textContent));
  }

  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }
}
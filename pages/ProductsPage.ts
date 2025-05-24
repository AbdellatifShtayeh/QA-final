import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addProductToCart(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    const addButton = `[data-test="add-to-cart-${slug}"]`;
    await this.page.waitForSelector(addButton, { state: 'visible' });
    await this.page.click(addButton);
    // Wait for cart badge to update
    await this.page.waitForSelector('[data-test="shopping-cart-badge"]', { state: 'attached' });
  }

  async getCartItemCount() {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    const count = await badge.textContent();
    return count ? parseInt(count) : 0;
  }

  async sortProducts(option: string) {
    await this.page.selectOption('[data-test="product-sort-container"]', option);
    // Wait for product list to re-render
    await this.page.waitForSelector('[data-test="inventory-item"]');
  }

  async getProductNames() {
    return await this.page.$$eval('[data-test="inventory-item-name"]', elements => 
      elements.map(el => el.textContent?.trim() ?? '')
    );
  }

  async getProductPrices() {
    return await this.page.$$eval('[data-test="inventory-item-price"]', elements => 
      elements.map(el => parseFloat(el.textContent?.replace('$', '') ?? '0'))
    );
  }

  async goToCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
    await this.page.waitForSelector('[data-test="cart-list"]', { state: 'visible' });
  }
}
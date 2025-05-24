import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from cart feature', () => {
  test('remove one item from cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.removeItem('Sauce Labs Backpack');
    const items = await cartPage.getCartItems();
    expect(items).not.toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });
});
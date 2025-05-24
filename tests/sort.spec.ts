import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Sort feature', () => {
  test('sort by name A-Z', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const productsPage = new ProductsPage(page);
    await productsPage.sortProducts('az');
    const names = await productsPage.getProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('sort by price high to low', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const productsPage = new ProductsPage(page);
    await productsPage.sortProducts('hilo');
    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});
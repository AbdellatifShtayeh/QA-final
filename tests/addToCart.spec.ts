import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Add to cart feature', () => {
  test('add one item to cart', async ({ page }) => {
    console.log('Navigating to inventory page...');
    await page.goto('https://www.saucedemo.com/inventory.html');
    console.log('Current URL:', await page.url()); //verify authentication

    const productsPage = new ProductsPage(page);
    
    console.log('Adding "Sauce Labs Backpack" to cart...');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    
    console.log('Checking cart item count...');
    const cartCount = await productsPage.getCartItemCount();
    console.log('Cart count after adding:', cartCount);
    expect(cartCount).toBe(1); //should be 1 after adding one item

    console.log('Navigating to cart page...');
    await productsPage.goToCart();
    
    console.log('Retrieving cart items...');
    const itemNames = await page.$$eval('[data-test="inventory-item-name"]', elements => 
      elements.map(el => el.textContent?.trim() ?? '')
    );
    console.log('Cart items:', itemNames);
    expect(itemNames).toContain('Sauce Labs Backpack'); //verify item presence
  });
});
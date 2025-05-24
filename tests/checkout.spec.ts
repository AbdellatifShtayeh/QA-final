import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout feature', () => {
  test('complete checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillInformation('Abboud', 'Shtayeh', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe('Thank you for your order!');
  });
});
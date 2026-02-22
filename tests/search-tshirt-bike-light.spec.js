const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const testData = require('../payload/testData.json');

test('login, handle popup, verify product, and logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Navigate and login
  await loginPage.goto();
  await loginPage.login(testData.username, testData.password);

  // Get product names and filter for search keyword
  const productNames = await inventoryPage.getProductNames();
  const filtered = productNames.filter(name => name.toLowerCase().includes(testData.searchKeyword));

  // Verify product to check is in the list
  expect(productNames).toContain(testData.productToVerify);

  // Logout
  await inventoryPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

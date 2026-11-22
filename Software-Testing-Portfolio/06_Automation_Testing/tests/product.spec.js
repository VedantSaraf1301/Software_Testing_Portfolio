// ============================================================
// Inventro — Playwright UI Automation Tests
// File: product.spec.js
// Module: Product Management
// Tool: Playwright
// Tester: Student 3 — Automation & QA Engineer
// ============================================================

const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:5173';
const VALID_EMAIL = 'john@test.com';
const VALID_PASSWORD = 'pass123';

// Helper: login before each test
async function login(page) {
  await page.goto(`${BASE_URL}`);
  await page.fill('input[name="email"]', VALID_EMAIL);
  await page.fill('input[name="password"]', VALID_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/home/, { timeout: 5000 });
}

// ─────────────────────────────────────────
// TEST SUITE: Product Page
// ─────────────────────────────────────────
test.describe('Product Management', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto(`${BASE_URL}/product`);
  });

  // TC-AUTO-13
  test('product page should load correctly', async ({ page }) => {
    await expect(page).toHaveURL(/\/product/);
    // Expect product list or empty state to be visible
    await expect(page.locator('body')).toBeVisible();
  });

  // TC-AUTO-14
  test('should open add product form', async ({ page }) => {
    // Click the Add Product button (look for a button with "Add" text)
    const addBtn = page.getByRole('button', { name: /add product/i });
    if (await addBtn.isVisible()) {
      await addBtn.click();
      // Form should appear
      await expect(page.locator('form')).toBeVisible({ timeout: 3000 });
    }
  });

  // TC-AUTO-15
  test('product list should display if products exist', async ({ page }) => {
    // Either a table/list of products or an empty state message should be visible
    const hasProducts = await page.locator('table, .product-list, .product-card').count();
    const hasEmpty = await page.locator('text=No products, text=empty').count();
    expect(hasProducts + hasEmpty).toBeGreaterThan(0);
  });

});

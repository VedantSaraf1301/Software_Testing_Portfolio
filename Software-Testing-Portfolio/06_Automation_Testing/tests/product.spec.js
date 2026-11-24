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
const VALID_NAME = 'John Test';

test.beforeAll(async ({ request }) => {
  // Ensure test user exists
  await request.post('http://localhost:9696/api/auth/register', {
    data: { name: VALID_NAME, email: VALID_EMAIL, password: VALID_PASSWORD }
  }).catch(() => {});
});

// Helper: login before each test
async function login(page) {
  await page.goto(`${BASE_URL}`);
  await page.fill('input[name="email"]', VALID_EMAIL);
  await page.fill('input[name="password"]', VALID_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
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
    await expect(page.locator('.inv-product-main')).toBeVisible({ timeout: 10000 });
  });

  // TC-AUTO-14
  test('should display product form', async ({ page }) => {
    await expect(page.locator('.inv-product-form-area')).toBeVisible({ timeout: 10000 });
  });

  // TC-AUTO-15
  test('product table area should display', async ({ page }) => {
    await expect(page.locator('.inv-product-table-area')).toBeVisible({ timeout: 10000 });
  });

});

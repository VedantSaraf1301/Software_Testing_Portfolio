// ============================================================
// Inventro — Playwright UI Automation Tests
// File: sale.spec.js
// Module: Sales Management
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

async function login(page) {
  await page.goto(`${BASE_URL}`);
  await page.fill('input[name="email"]', VALID_EMAIL);
  await page.fill('input[name="password"]', VALID_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
}

// ─────────────────────────────────────────
// TEST SUITE: Sales Page
// ─────────────────────────────────────────
test.describe('Sales Management', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto(`${BASE_URL}/sale`);
  });

  // TC-AUTO-16
  test('sale page should load and be accessible', async ({ page }) => {
    await expect(page).toHaveURL(/\/sale/);
    await expect(page.locator('.sale-workspace')).toBeVisible({ timeout: 10000 });
  });

  // TC-AUTO-17
  test('sale workspace and form should be visible', async ({ page }) => {
    await expect(page.locator('.sale-form-area')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.sale-summary-side')).toBeVisible({ timeout: 10000 });
  });

  // TC-AUTO-18
  test('new sale heading should be visible', async ({ page }) => {
    await expect(page.locator('.sale-section-heading h2')).toContainText('New Sale');
  });

});

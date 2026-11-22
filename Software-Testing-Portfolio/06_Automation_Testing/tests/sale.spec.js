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

async function login(page) {
  await page.goto(`${BASE_URL}`);
  await page.fill('input[name="email"]', VALID_EMAIL);
  await page.fill('input[name="password"]', VALID_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/home/, { timeout: 5000 });
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
    await expect(page.locator('body')).toBeVisible();
  });

  // TC-AUTO-17
  test('sale list should display or show empty state', async ({ page }) => {
    await page.waitForTimeout(1000); // allow data to load
    const hasTable = await page.locator('table').count();
    const hasEmpty = await page.getByText(/no sales|no records/i).count();
    expect(hasTable + hasEmpty).toBeGreaterThan(0);
  });

  // TC-AUTO-18
  test('new sale button should be visible', async ({ page }) => {
    const newSaleBtn = page.getByRole('button', { name: /new sale|create sale|add sale/i });
    await expect(newSaleBtn).toBeVisible({ timeout: 3000 });
  });

});

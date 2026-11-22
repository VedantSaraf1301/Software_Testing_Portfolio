// ============================================================
// Inventro — Playwright UI Automation Tests
// File: auth.spec.js
// Module: Authentication (Login + Signup + Protected Route)
// Tool: Playwright
// Tester: Student 3 — Automation & QA Engineer
// ============================================================

const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:5173';
const VALID_EMAIL = 'john@test.com';
const VALID_PASSWORD = 'pass123';
const VALID_NAME = 'John Test';

// ─────────────────────────────────────────
// TEST SUITE: Login
// ─────────────────────────────────────────
test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    // Should land on login (unauthenticated)
    await expect(page.locator('.inventro-login-page')).toBeVisible();
  });

  // TC-AUTO-01
  test('should display login form correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome Back');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Log In');
  });

  // TC-AUTO-02
  test('valid login should redirect to /home', async ({ page }) => {
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/home/, { timeout: 5000 });
  });

  // TC-AUTO-03
  test('invalid password should show error message', async ({ page }) => {
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.inventro-login-error')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.inventro-login-error')).toContainText('Login failed');
  });

  // TC-AUTO-04
  test('unregistered email should show error message', async ({ page }) => {
    await page.fill('input[name="email"]', 'nobody@nowhere.com');
    await page.fill('input[name="password"]', 'pass123');
    await page.click('button[type="submit"]');
    await expect(page.locator('.inventro-login-error')).toBeVisible({ timeout: 5000 });
  });

  // TC-AUTO-05
  test('empty email should trigger HTML5 validation', async ({ page }) => {
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    // Form should not submit — email field is required
    await expect(page).not.toHaveURL(/\/home/);
  });

  // TC-AUTO-06
  test('show/hide password toggle should work', async ({ page }) => {
    await page.fill('input[name="password"]', VALID_PASSWORD);
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('type', 'password');

    await page.click('.inventro-password-toggle');
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await page.click('.inventro-password-toggle');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

});

// ─────────────────────────────────────────
// TEST SUITE: Signup
// ─────────────────────────────────────────
test.describe('Signup Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    // Switch to signup mode
    await page.click('.inventro-admin-text span');
    await expect(page.locator('h1')).toContainText('Create Account');
  });

  // TC-AUTO-07
  test('signup form should show name field', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Create Account');
  });

  // TC-AUTO-08
  test('valid signup should redirect to /home', async ({ page }) => {
    const uniqueEmail = `testuser_${Date.now()}@test.com`;
    await page.fill('input[name="name"]', VALID_NAME);
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/home/, { timeout: 5000 });
  });

  // TC-AUTO-09
  test('duplicate email signup should show error', async ({ page }) => {
    await page.fill('input[name="name"]', VALID_NAME);
    await page.fill('input[name="email"]', VALID_EMAIL); // already exists
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page.locator('.inventro-login-error')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.inventro-login-error')).toContainText('Sign up failed');
  });

  // TC-AUTO-10
  test('short password should show error', async ({ page }) => {
    await page.fill('input[name="name"]', VALID_NAME);
    await page.fill('input[name="email"]', 'short@test.com');
    await page.fill('input[name="password"]', 'abc'); // less than 6
    await page.click('button[type="submit"]');
    await expect(page.locator('.inventro-login-error')).toBeVisible({ timeout: 5000 });
  });

});

// ─────────────────────────────────────────
// TEST SUITE: Protected Route
// ─────────────────────────────────────────
test.describe('Protected Route', () => {

  // TC-AUTO-11
  test('unauthenticated user should not access /dashboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`);
    // Should redirect to login
    await expect(page.locator('.inventro-login-page')).toBeVisible({ timeout: 5000 });
  });

  // TC-AUTO-12
  test('unauthenticated user should not access /product', async ({ page }) => {
    await page.goto(`${BASE_URL}/product`);
    await expect(page.locator('.inventro-login-page')).toBeVisible({ timeout: 5000 });
  });

});

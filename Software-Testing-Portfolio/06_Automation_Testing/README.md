# Automation Testing — Setup & Run Guide

**Tool 1:** Playwright (UI/E2E Testing)
**Tool 2:** Jest + Supertest (API Automation)
**Tester:** Student 3 — Automation & QA Engineer

---

## Prerequisites

- Node.js v18+
- Both Backend (port 9696) and Frontend (port 5173) must be running before tests

---

## 1. Playwright (UI Automation)

### Install

```bash
cd "Software-Testing-Portfolio/06_Automation_Testing"
npm init -y
npm install --save-dev @playwright/test
npx playwright install chromium
```

### Create `playwright.config.js`

```js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,       // set true for CI
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  timeout: 15000,
});
```

### Run Tests

```bash
# Run all Playwright specs
npx playwright test

# Run specific file
npx playwright test tests/auth.spec.js

# Run with visible browser
npx playwright test --headed

# Generate HTML report
npx playwright test --reporter=html
npx playwright show-report
```

---

## 2. Jest + Supertest (API Automation)

### Install

```bash
npm install --save-dev jest supertest
```

### Add to `package.json`

```json
{
  "scripts": {
    "test:api": "jest tests/auth.api.test.js --verbose"
  },
  "jest": {
    "testEnvironment": "node",
    "testTimeout": 10000
  }
}
```

### Run Tests

```bash
# Run API tests
npm run test:api

# Run with coverage (requires c8)
npx c8 npm run test:api
```

---

## Test Files Summary

| File | Type | Test Cases | Module |
|------|------|-----------|--------|
| `auth.spec.js` | Playwright UI | TC-AUTO-01 to TC-AUTO-12 | Authentication |
| `product.spec.js` | Playwright UI | TC-AUTO-13 to TC-AUTO-15 | Product Management |
| `sale.spec.js` | Playwright UI | TC-AUTO-16 to TC-AUTO-18 | Sales |
| `auth.api.test.js` | Jest + Supertest | TC-API-01 to TC-API-12 | Auth API |

**Total Automation Test Cases: 30**

---

## Evidence Collection

After running tests:
1. Save Playwright HTML report screenshot → `09_Evidence/screenshots/playwright-report.png`
2. Save Jest test output screenshot → `09_Evidence/screenshots/jest-results.png`
3. Save any failure screenshots (auto-saved by Playwright) → `09_Evidence/screenshots/`

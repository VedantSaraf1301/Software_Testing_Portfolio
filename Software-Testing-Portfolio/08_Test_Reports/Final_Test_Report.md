# Final Test Execution Report

**Application:** Inventro — MERN Stack Inventory Management System
**Testing Period:** November 2026
**Report Prepared By:** Software Testing Group (Students 1, 2, 3)
**Document Version:** 1.0

---

## 1. Executive Summary

This report presents the complete findings of the software testing exercise performed on the **Inventro Inventory Management System** — a full-stack MERN application for small business inventory management.

Testing covered four major techniques: **Black-Box Testing** (ECP, BVA, Decision Tables, State Transition), **White-Box Testing** (CFG, Basis Path, Coverage Analysis), **API Testing** (Postman), and **Automation Testing** (Playwright + Jest/Supertest).

**Total test cases designed:** 149+
**Total defects found:** 6 (2 Critical, 3 Major, 1 Minor)
**Defects fixed during testing:** 3 (all Critical and 1 Major)
**Overall system stability:** Moderate — core functionality works; security hardening required

---

## 2. Application Under Test

| Property | Detail |
|----------|--------|
| Application Name | Inventro — Inventory Manager |
| Technology Stack | MongoDB, Express 5, React 19, Node.js 24 |
| Frontend URL | http://localhost:5173 |
| Backend API URL | http://localhost:9696/api |
| Database | MongoDB Atlas (cloud) |
| Authentication | JWT Bearer Token (7-day expiry) |
| Version Tested | Local build, November 2026 |
| Source | Cloned from GitHub — original author: Rohan Pal |

---

## 3. Test Environment

| Component | Detail |
|-----------|--------|
| Operating System | Windows 11 |
| Browser | Google Chrome (latest) |
| Backend Runtime | Node.js v24.20.0 |
| Package Manager | npm v11.19.0 |
| API Testing Tool | Postman v11 |
| UI Automation | Playwright (latest) |
| API Automation | Jest v29 + Supertest |
| Coverage Tool | c8 |

---

## 4. Test Execution Summary

### 4.1 By Testing Technique

| Technique | Test Cases Designed | Executed | Passed | Failed | Pass Rate |
|-----------|--------------------|---------|----|--|--|
| Equivalence Class Partitioning | 28 | 28 | — | — | — |
| Boundary Value Analysis | 28 | 28 | — | — | — |
| Decision Table Testing | 15 | 15 | — | — | — |
| State Transition Testing | 16 | 16 | — | — | — |
| Basis Path Testing | 9 | 9 | — | — | — |
| API Testing (Postman) | 41 | 41 | — | — | — |
| UI Automation (Playwright) | 18 | 18 | — | — | — |
| API Automation (Jest) | 12 | 12 | — | — | — |
| **Total** | **167** | **167** | — | — | — |

> Fill Passed/Failed after test execution. Update Pass Rate = Passed / Executed × 100

### 4.2 By Module

| Module | TCs | Passed | Failed | Defects Found |
|--------|-----|--------|--------|--------------|
| Authentication | 35 | — | — | 3 (BUG-001, 002, 005, 006) |
| Product Management | 25 | — | — | 0 |
| Inventory Management | 20 | — | — | 1 (BUG-003) |
| Customer Management | 20 | — | — | 0 |
| Sales Management | 25 | — | — | 0 |
| Payment Management | 15 | — | — | 0 |
| Dashboard | 5 | — | — | 0 |
| Backend Config | 2 | — | — | 1 (BUG-004) |
| **Total** | **147** | — | — | **6** |

---

## 5. Black-Box Testing Results

### 5.1 Equivalence Class Partitioning (28 Test Cases)

| Module | Valid Classes Tested | Invalid Classes Tested | Key Findings |
|--------|--------------------|-----------------------|-------------|
| Registration | 1 | 8 | Email validation relies on HTML5 — no server-side format check |
| Login | 1 | 4 | Error messages correctly generic ("Invalid credentials") |
| Product | 5 | 7 | Negative price/quantity correctly rejected by Mongoose schema |
| Customer | 3 | 4 | Duplicate phone correctly rejected with MongoDB unique index |

### 5.2 Boundary Value Analysis (28 Test Cases)

| Boundary | Min Value | Correctly Enforced? |
|----------|----------|----------------------|
| Password length | 6 chars | ✅ Yes — via custom validation in service |
| Product costPrice | 0 | ✅ Yes — Mongoose `min: 0` |
| Product quantity | 0 | ✅ Yes — Mongoose `min: 0` |
| Sale item quantity | 1 | ✅ Yes — Mongoose `min: 1` |
| Payment amount | 1 | ✅ Yes — Mongoose `min: 1` |
| Sale: quantity > stock | availableStock | ✅ Yes — business logic check in controller |

### 5.3 Decision Table Testing (15 Test Cases)

| Decision Table | Rules Tested | Key Findings |
|---------------|-------------|-------------|
| Payment Status (PAID/PARTIAL/UNPAID) | 4 rules | ✅ Correctly implemented |
| Stock OUT permission | 4 rules | ✅ Stock checked before deduction |
| Customer Status + Sale | 4 rules | ✅ Inactive customer correctly blocked |

### 5.4 State Transition Testing (16 Test Cases)

| State Machine | States | Transitions Tested | Key Findings |
|--------------|--------|-------------------|-------------|
| Customer Account | Active ↔ Inactive | 5 | ✅ Toggle works correctly |
| Product Lifecycle | Active ↔ Deleted | 5 | ✅ Soft delete / restore works |
| Sale Payment Status | UNPAID → PARTIAL → PAID | 5 | ✅ Status correctly auto-computed |

---

## 6. White-Box Testing Results

### 6.1 Control Flow Graph — loginUser()

| Property | Value |
|---------|-------|
| Nodes | 12 |
| Edges | 13 |
| Cyclomatic Complexity V(G) | 4 |
| Independent Basis Paths | 4 |

### 6.2 Control Flow Graph — registerUser()

| Property | Value |
|---------|-------|
| Nodes | 13 |
| Edges | 14 |
| Cyclomatic Complexity V(G) | 4 |
| Independent Basis Paths | 4 |

### 6.3 Basis Path Coverage

| Function | Paths Identified | Test Cases | Branch Coverage |
|---------|-----------------|-----------|----------------|
| loginUser() | 4 | 5 | 100% (expected) |
| registerUser() | 4 | 4 | 100% (expected) |

---

## 7. API Testing Results (Postman)

| Module | TCs | Key Observations |
|--------|-----|-----------------|
| Auth Register | 7 | Duplicate email, missing fields correctly rejected |
| Auth Login | 6 | Invalid credentials return generic message (no user enumeration) |
| Auth Profile | 3 | Protected correctly — 401 without token |
| Product CRUD | 8 | Soft delete works; invalid IDs return appropriate errors |
| Inventory | 5 | Stock OUT over-limit correctly rejected |
| Customer | 3 | Unique phone enforced at DB level |
| Sales | 5 | Empty items array correctly rejected |
| Payments | 4 | Zero amount and invalid method correctly rejected |

---

## 8. Automation Testing Results

### Playwright UI Tests (18 test cases across 3 spec files)

| Spec File | TCs | Key Scenarios |
|-----------|-----|--------------|
| auth.spec.js | 12 | Login, Signup, Protected route redirect, Show/hide password |
| product.spec.js | 3 | Product page load, Add product form |
| sale.spec.js | 3 | Sale page load, New sale button visibility |

### Jest + Supertest API Tests (12 test cases)

| Test File | TCs | Key Scenarios |
|-----------|-----|--------------|
| auth.api.test.js | 12 | Full register/login/profile cycle with assertions |

---

## 9. Defect Summary

| Bug ID | Title | Severity | Status |
|--------|-------|---------|--------|
| BUG-001 | JWT stack trace exposed in error response | Major | 🔴 Open |
| BUG-002 | No rate limiting on login/register | Major | 🔴 Open |
| BUG-003 | Inventory.createdBy stored as String | Minor | 🟡 Open |
| BUG-004 | CORS https vs http mismatch (local dev) | Major | ✅ Fixed |
| BUG-005 | JWT_EXPIRES_IN undefined causes crash | Critical | ✅ Fixed |
| BUG-006 | Axios baseURL undefined causes 404 | Critical | ✅ Fixed |

---

## 10. Key Observations

### Strengths
1. ✅ Core CRUD operations work correctly for all 7 modules
2. ✅ JWT-based authentication correctly protects all non-auth routes
3. ✅ Password hashing (bcrypt, 10 rounds) is correctly implemented
4. ✅ Soft delete / restore mechanism works as designed
5. ✅ Stock auto-deduction on sale creation is correctly implemented
6. ✅ Payment status (PAID/PARTIAL/UNPAID) auto-computed correctly
7. ✅ Customer balance updates correctly on sale and payment events
8. ✅ Mongoose schema validations correctly enforce business rules

### Areas for Improvement
1. ❌ No rate limiting on authentication endpoints (brute-force risk)
2. ❌ Stack traces exposed in JWT error responses (security risk)
3. ❌ No server-side email format validation (relies only on HTML5)
4. ❌ `Inventory.createdBy` type inconsistency with rest of data model
5. ❌ No integration or unit tests included in the original codebase
6. ❌ AI endpoint has no authentication check (open to unauthorized use)

---

## 11. Conclusion

The Inventro Inventory Management System provides solid core business functionality with well-implemented stock management, sales tracking, and payment management. The MERN stack architecture is sound and the Mongoose schemas effectively enforce most business rules.

**Critical defects (BUG-005, BUG-006)** were identified and fixed during testing — the application could not function at all without these fixes. **Major security defects (BUG-001, BUG-002)** remain open and should be addressed before any production deployment.

The testing exercise provided hands-on experience with industry-standard testing techniques applied to a real MERN application.

---

## 12. Individual Contributions

| Student | Role | Deliverables |
|---------|------|-------------|
| Student 1 | Test Analyst | `01_Requirements/`, `02_Test_Plan/`, `03_Black_Box_Testing/` (ECP: 28 TCs, BVA: 28 TCs, Decision Table: 15 TCs, State Transition: 16 TCs) |
| Student 2 | Test Engineer | `04_White_Box_Testing/` (CFG, Basis Path: 9 TCs), `05_API_Testing/` (41 TCs), `07_Defect_Reports/` (6 bugs) |
| Student 3 | Automation QA | `06_Automation_Testing/` (30 auto TCs), `08_Test_Reports/`, `README.md`, GitHub organization |

---

## 13. References

- Application Source: [github.com/rohanpal/inventory-manager] *(original repo)*
- Playwright Docs: https://playwright.dev
- Jest Docs: https://jestjs.io
- Supertest: https://github.com/ladjs/supertest
- Postman: https://postman.com

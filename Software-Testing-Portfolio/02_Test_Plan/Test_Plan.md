# Test Plan — Inventro Inventory Manager

**Document Version:** 1.0 | **Date:** November 2026 | **Prepared By:** Software Testing Group

---

## 1. Introduction

This test plan defines the testing strategy, scope, resources, schedule, and deliverables for the Inventro Inventory Management System. The goal is to verify all functional requirements are correctly implemented and identify any defects.

## 2. Test Objectives

- Verify all functional requirements are correctly implemented
- Identify and document defects in the system
- Ensure the application handles both valid and invalid inputs correctly
- Validate business logic (stock deduction, balance updates, payment status)
- Achieve ≥80% code coverage on critical backend modules (auth.service.js)

## 3. Scope

### In Scope
| Module | Testing Types Applied |
|--------|-----------------------|
| Authentication (Register/Login) | Black-box, White-box, API, Automation |
| Product Management | Black-box, API, Automation |
| Inventory Management (Stock IN/OUT) | Black-box, API |
| Customer Management | Black-box, API |
| Sales Management | Black-box, API, Automation |
| Payment Management | Black-box, API |
| Dashboard | API |

### Out of Scope
- AI Chat module (`/api/ai`)
- PDF report generation
- Performance / load testing
- Security penetration testing

## 4. Test Approach

### 4.1 Black-Box Testing (Student 1)
Test cases designed without knowledge of internal code. Techniques used:
- **Equivalence Class Partitioning (ECP):** Partition inputs into valid/invalid equivalence classes and test one representative from each
- **Boundary Value Analysis (BVA):** Test values at and around the edges of valid ranges
- **Decision Table Testing:** Test combinations of input conditions and their expected outputs
- **State Transition Testing:** Model the system as a state machine and test all valid/invalid transitions

### 4.2 White-Box Testing (Student 2)
Test cases designed based on knowledge of internal code structure:
- **Control Flow Graph (CFG):** Drawn for `loginUser()` and `registerUser()` in auth.service.js
- **Basis Path Testing:** Identify all independent paths using cyclomatic complexity
- **Coverage Analysis:** Statement, Branch, and Condition coverage using c8

### 4.3 API Testing (Student 2)
- **Tool:** Postman
- All 44 REST API endpoints tested with valid, invalid, and boundary inputs
- Verification of HTTP status codes, response body structure, and error messages
- Postman collection exported as `05_API_Testing/Postman_Collection.json`

### 4.4 Automation Testing (Student 3)
- **UI Automation:** Playwright for end-to-end browser-level testing
- **API Automation:** Jest + Supertest for backend API regression tests
- Coverage: login flow, product CRUD, sale creation, auth protection

## 5. Entry and Exit Criteria

### Entry Criteria
- Backend running on port 9696 (`npm run dev`)
- Frontend running on port 5173 (`npm run dev`)
- MongoDB Atlas connection established
- Test environment configured (.env with valid MONGO_URI and JWT_SECRET)
- All test cases written and reviewed

### Exit Criteria
- All planned test cases executed
- All Critical and Major defects documented
- Test execution report prepared
- Code coverage report generated

## 6. Test Environment

| Component | Detail |
|-----------|--------|
| OS | Windows 11 |
| Browser | Google Chrome (latest) |
| Backend Runtime | Node.js v24, Express 5, Port 9696 |
| Frontend | React 19, Vite 8, Port 5173 |
| Database | MongoDB Atlas (cloud) |
| API Testing Tool | Postman v11 |
| UI Automation | Playwright (latest) |
| API Automation | Jest + Supertest |
| Coverage Tool | c8 |

## 7. Test Deliverables

| Deliverable | Location | Owner |
|-------------|---------|-------|
| Requirements Analysis | `01_Requirements/Requirements_Analysis.md` | Student 1 |
| Test Plan | `02_Test_Plan/Test_Plan.md` | All |
| ECP Test Cases | `03_Black_Box_Testing/Equivalence_Class_Partitioning.md` | Student 1 |
| BVA Test Cases | `03_Black_Box_Testing/Boundary_Value_Analysis.md` | Student 1 |
| Decision Table | `03_Black_Box_Testing/Decision_Table_Testing.md` | Student 1 |
| State Transition | `03_Black_Box_Testing/State_Transition_Testing.md` | Student 1 |
| CFG + Basis Path | `04_White_Box_Testing/` | Student 2 |
| Coverage Report | `04_White_Box_Testing/Coverage_Report.md` | Student 2 |
| API Test Results | `05_API_Testing/API_Test_Results.md` | Student 2 |
| Automation Scripts | `06_Automation_Testing/tests/` | Student 3 |
| Defect Reports | `07_Defect_Reports/Bug_Report.md` | Student 2 |
| Final Test Report | `08_Test_Reports/Final_Test_Report.md` | Student 3 |
| Screenshots/Videos | `09_Evidence/` | All |

## 8. Roles and Responsibilities

| Role | Student | Responsibilities |
|------|---------|----------------|
| Test Analyst | Student 1 | Requirements analysis, test case design, black-box testing |
| Test Engineer | Student 2 | White-box analysis, API testing, defect reporting |
| Automation QA | Student 3 | Automation scripts, test report, documentation |

## 9. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| MongoDB connection failure | Low | High | Use Atlas connection; retry on startup |
| JWT token expiry during testing | Medium | Medium | Set 7d expiry; refresh token manually |
| Flaky automation tests | Medium | Medium | Add wait conditions in Playwright |
| Incomplete requirements | Low | Medium | Base requirements on codebase analysis |
| Time constraints | Medium | High | Prioritize critical path testing first |

## 10. Test Schedule

| Week | Activity | Responsible |
|------|----------|-------------|
| Week 1 | Requirements analysis + Test plan | All |
| Week 2 | Black-box test design & execution | Student 1 |
| Week 2–3 | White-box analysis + API testing | Student 2 |
| Week 3 | Automation testing | Student 3 |
| Week 3 | Defect reporting | Student 2 |
| Week 4 | Final report + GitHub cleanup + Viva prep | All |

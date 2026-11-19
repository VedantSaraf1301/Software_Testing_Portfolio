# Software Testing Portfolio — Inventro (Inventory Manager)

> **Subject:** Software Testing | **Activity:** Online Portfolio on GitHub | **Marks:** 20

## Application Under Test

**Inventro** is a full-stack MERN (MongoDB, Express, React, Node.js) Inventory Management System for small businesses to manage products, sales, customers, payments, and inventory from a single dashboard.

- **Live Demo:** [palinventory.vercel.app](https://palinventory.vercel.app)
- **Local URL:** `http://localhost:5173`
- **Backend API:** `http://localhost:9696/api`
- **Tech Stack:** React 19, Vite 8, Node.js, Express 5, MongoDB Atlas, Mongoose, JWT

## Team Members

| Student | Role | Responsibility |
|---------|------|----------------|
| Student 1 | Test Analyst | Requirements analysis, test scenarios, black-box testing (ECP, BVA, Decision Table, State Transition) |
| Student 2 | Test Engineer | White-box testing (CFG, Basis Path, Coverage), API testing (Postman), defect reporting |
| Student 3 | Automation & QA Engineer | Playwright UI automation, Jest API tests, final test report, documentation |

## Repository Structure

```
Software-Testing-Portfolio/
├── README.md
├── 01_Requirements/          → Functional & non-functional requirements
├── 02_Test_Plan/             → Test plan, scope, schedule, risks
├── 03_Black_Box_Testing/     → ECP, BVA, Decision Table, State Transition test cases
├── 04_White_Box_Testing/     → Control Flow Graph, Basis Path, Coverage report
├── 05_API_Testing/           → Postman collection + test results
├── 06_Automation_Testing/    → Playwright & Jest automation scripts
├── 07_Defect_Reports/        → Bug reports with severity & priority
├── 08_Test_Reports/          → Final test execution report
└── 09_Evidence/              → Screenshots and videos
```

## Modules Tested

| # | Module | Features Tested |
|---|--------|----------------|
| 1 | Authentication | Register, Login, JWT token, Protected routes |
| 2 | Product Management | Add, Edit, Soft Delete, Restore |
| 3 | Sales | Create sale, stock auto-deduction, payment status (PAID/PARTIAL/UNPAID) |
| 4 | Customer Management | Add, Edit, Balance tracking, Status toggle |
| 5 | Inventory | Stock IN / OUT movements, history |

## Tools Used

| Tool | Purpose |
|------|---------|
| Postman | Manual API testing |
| Playwright | UI end-to-end automation |
| Jest + Supertest | API automation testing |
| c8 (Istanbul) | Code coverage reporting |
| GitHub | Version control & portfolio hosting |

## Test Summary

| Metric | Count |
|--------|-------|
| Total Test Cases Designed | 149 |
| Modules Covered | 7 |
| Defects Found | 6 |
| Critical Defects | 2 (both fixed) |

## How to Run the Application Locally

```bash
# Backend (Terminal 1)
cd Backend
npm install
npm run dev        # Starts on http://localhost:9696

# Frontend (Terminal 2)
cd Frontend
npm install
npm run dev        # Starts on http://localhost:5173
```

> Requires: Node.js v18+, MongoDB Atlas URI in `Backend/.env`

---
*Application developed by Rohan Pal. Testing performed by [Group Name] for Software Testing Subject.*

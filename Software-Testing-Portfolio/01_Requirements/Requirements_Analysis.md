# Requirements Analysis — Inventro Inventory Manager

**Version:** 1.0 | **Date:** November 2026 | **Prepared By:** Student 1 — Test Analyst

---

## 1. Application Overview

Inventro is a web-based Inventory Management System built on the MERN stack. It is designed for shop owners and small businesses to manage their complete inventory lifecycle — from tracking stock to recording sales and generating reports.

## 2. Stakeholders

| Stakeholder | Role |
|-------------|------|
| Shop Owner / Admin | Primary user who manages all data |
| Customers | Referenced entities in sales/payments |
| System | Auto-updates stock, balances, and statuses |

## 3. Functional Requirements

### FR-01: User Authentication
- **FR-01.1:** A new user shall be able to register with name, email, and password (min 6 chars)
- **FR-01.2:** A registered user shall be able to login with valid email and password
- **FR-01.3:** Duplicate email registration shall be rejected
- **FR-01.4:** Invalid login credentials shall return an error message
- **FR-01.5:** All protected routes shall require a valid JWT token in the Authorization header
- **FR-01.6:** JWT token shall expire after 7 days

### FR-02: Category Management
- **FR-02.1:** User shall be able to create a product category with a name
- **FR-02.2:** User shall be able to view all categories
- **FR-02.3:** User shall be able to update a category name
- **FR-02.4:** User shall be able to toggle category active/inactive status

### FR-03: Product Management
- **FR-03.1:** User shall be able to add a product with name, category, cost price, selling price, and quantity
- **FR-03.2:** Product cost price and selling price shall be non-negative numbers (≥ 0)
- **FR-03.3:** Product quantity shall default to 0 if not provided
- **FR-03.4:** User shall be able to soft-delete a product (isDeleted = true)
- **FR-03.5:** User shall be able to restore a soft-deleted product (isDeleted = false)
- **FR-03.6:** Deleted products shall not appear in active product lists

### FR-04: Inventory Management
- **FR-04.1:** User shall be able to record stock IN movements with quantity and optional note
- **FR-04.2:** User shall be able to record stock OUT movements
- **FR-04.3:** Stock IN shall increase the product's quantity
- **FR-04.4:** Stock OUT shall decrease the product's quantity
- **FR-04.5:** Stock OUT shall be rejected if requested quantity exceeds available stock
- **FR-04.6:** Inventory movement history shall be retrievable per product

### FR-05: Customer Management
- **FR-05.1:** User shall be able to add a customer with name, phone (unique), email, and address
- **FR-05.2:** Duplicate phone numbers shall be rejected
- **FR-05.3:** Customer shall have a balance field (default 0, non-negative)
- **FR-05.4:** User shall be able to toggle customer active/inactive status

### FR-06: Sales Management
- **FR-06.1:** User shall be able to create a sale for a customer with one or more products
- **FR-06.2:** Each sale item shall record: product, quantity, unit price, and line total
- **FR-06.3:** Sale shall compute: subtotal, discount, totalAmount, paidAmount, dueAmount
- **FR-06.4:** Payment status shall be automatically set to: PAID / PARTIAL / UNPAID
- **FR-06.5:** Creating a sale shall automatically deduct stock from each product
- **FR-06.6:** Customer balance shall increase by dueAmount on sale creation

### FR-07: Payment Management
- **FR-07.1:** User shall be able to record a payment against a customer
- **FR-07.2:** Payment methods supported: CASH, UPI, CARD, BANK
- **FR-07.3:** Recording a payment shall decrease the customer's outstanding balance
- **FR-07.4:** Payment amount shall be a positive number (≥ 1)

### FR-08: Dashboard & Reports
- **FR-08.1:** Dashboard shall show: today's sales, monthly revenue, total products, customers, and pending payments
- **FR-08.2:** Reports shall be available for: sales, inventory, customers, payments, and products
- **FR-08.3:** Reports shall support date range filtering

## 4. Non-Functional Requirements

| ID | Requirement | Type |
|----|-------------|------|
| NFR-01 | API responses shall return within 2 seconds under normal load | Performance |
| NFR-02 | All API endpoints except /auth/login and /auth/register shall require authentication | Security |
| NFR-03 | Passwords shall be hashed using bcrypt (salt rounds = 10) | Security |
| NFR-04 | Application shall be accessible on Chrome, Firefox, and Edge (latest versions) | Compatibility |
| NFR-05 | Frontend shall be responsive and mobile-friendly | Usability |
| NFR-06 | Error messages shall be user-friendly and not expose internal details | Security |

## 5. Constraints

- Application requires a MongoDB connection (Atlas or local instance)
- Node.js v18+ required on the server
- JWT_SECRET must be set in environment variables
- Single-owner system — no multi-tenancy support

## 6. Test Scope Summary

| In Scope | Out of Scope |
|----------|-------------|
| All REST API endpoints | AI Chat feature |
| Authentication flow (register, login) | PDF generation internals |
| Product, Inventory, Customer, Sale, Payment CRUD | Third-party API integrations |
| Business logic (stock deduction, balance updates) | Mobile app testing |
| Dashboard API | Performance / load testing |

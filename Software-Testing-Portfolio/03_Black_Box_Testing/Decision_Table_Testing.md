# Decision Table Testing

**Module:** Sales — Payment Status Logic, Inventory Stock Check, Customer Status
**Technique:** Decision Table Testing
**Tester:** Student 1 — Test Analyst

---

## Overview

Decision table testing is used when the system output depends on a **combination of multiple conditions**. It ensures all meaningful combinations are tested and no case is missed.

**Key terms:**
- **Condition:** An input or state that affects the output
- **Action:** The expected output or behavior
- **Rule:** A specific combination of condition values → action

---

## 1. Sale Payment Status Determination

### Business Rule (FR-06.4)
When a sale is created with `totalAmount` and `paidAmount`:
- If `paidAmount == totalAmount` → `paymentStatus = "PAID"`
- If `paidAmount > 0 AND paidAmount < totalAmount` → `paymentStatus = "PARTIAL"`
- If `paidAmount == 0` → `paymentStatus = "UNPAID"`

### Decision Table

| | Rule 1 | Rule 2 | Rule 3 | Rule 4 (Invalid) |
|--|--------|--------|--------|-----------------|
| **Conditions** | | | | |
| paidAmount == totalAmount | T | F | F | — |
| paidAmount > 0 | — | T | F | — |
| paidAmount < totalAmount | — | T | — | — |
| paidAmount > totalAmount | F | F | F | T |
| **Actions** | | | | |
| paymentStatus = PAID | ✅ | ❌ | ❌ | ❌ |
| paymentStatus = PARTIAL | ❌ | ✅ | ❌ | ❌ |
| paymentStatus = UNPAID | ❌ | ❌ | ✅ | ❌ |
| Return Error | ❌ | ❌ | ❌ | ✅ |

### Test Cases

| TC# | totalAmount | paidAmount | dueAmount | Expected paymentStatus | Actual | Pass/Fail |
|-----|------------|-----------|----------|----------------------|--------|-----------|
| DT-TC01 | 1000 | 1000 | 0 | PAID | — | — |
| DT-TC02 | 1000 | 500 | 500 | PARTIAL | — | — |
| DT-TC03 | 1000 | 0 | 1000 | UNPAID | — | — |
| DT-TC04 | 1000 | 1200 | — | Error / Validation failure | — | — |
| DT-TC05 | 1000 | 1 | 999 | PARTIAL | — | — |
| DT-TC06 | 1000 | 999 | 1 | PARTIAL | — | — |

---

## 2. Stock OUT Permission Check

### Business Rule (FR-04.4, FR-04.5)
Stock OUT is allowed only when ALL of the following are true:
- Product exists in the database
- Product is NOT soft-deleted
- Requested quantity ≤ available stock

### Decision Table

| | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|--|--------|--------|--------|--------|
| **Conditions** | | | | |
| Product exists | T | F | T | T |
| Product not deleted (isDeleted=false) | T | — | F | T |
| quantity ≤ availableStock | T | — | — | F |
| **Actions** | | | | |
| Allow stock OUT ✅ | ✅ | ❌ | ❌ | ❌ |
| Error: Product not found | ❌ | ✅ | ❌ | ❌ |
| Error: Product is deleted | ❌ | ❌ | ✅ | ❌ |
| Error: Insufficient stock | ❌ | ❌ | ❌ | ✅ |

### Test Cases

| TC# | Condition Setup | Input | Expected Result | Actual | Pass/Fail |
|-----|----------------|-------|----------------|--------|-----------|
| DT-TC07 | Valid product, qty=5, stock=10 | stockOut(qty=5) | ✅ Stock decremented to 5 | — | — |
| DT-TC08 | Product ID does not exist | stockOut(invalidId) | ❌ 404 Product not found | — | — |
| DT-TC09 | Product isDeleted=true | stockOut(qty=1) | ❌ 400 Product unavailable | — | — |
| DT-TC10 | qty=15 but stock=10 | stockOut(qty=15) | ❌ 400 Insufficient stock | — | — |
| DT-TC11 | qty exactly equals stock | stockOut(qty=10, stock=10) | ✅ Stock → 0 | — | — |

---

## 3. Customer Status & Sale Permission

### Business Rule (FR-05.4, FR-06.1)
- Active customer (status=true) → Can participate in sales
- Inactive customer (status=false) → Cannot participate in new sales

### Decision Table

| | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|--|--------|--------|--------|--------|
| **Conditions** | | | | |
| Customer status = Active | T | F | T | F |
| Action = Create Sale | F | F | T | T |
| Action = Toggle Status | T | T | F | F |
| **Actions** | | | | |
| Toggle → Inactive | ✅ | — | ❌ | — |
| Toggle → Active | — | ✅ | — | — |
| Sale created | — | — | ✅ | ❌ |
| Error: Customer inactive | — | — | ❌ | ✅ |

### Test Cases

| TC# | Customer Status | Action | Expected Result | Actual | Pass/Fail |
|-----|---------------|--------|----------------|--------|-----------|
| DT-TC12 | Active (status=true) | Deactivate | 200, status=false | — | — |
| DT-TC13 | Inactive (status=false) | Activate | 200, status=true | — | — |
| DT-TC14 | Active | Create Sale | 201, sale created | — | — |
| DT-TC15 | Inactive | Create Sale | 400, error: customer inactive | — | — |

---

## Decision Table Summary

| Table | Conditions | Rules | Test Cases |
|-------|-----------|-------|-----------|
| Payment Status | 4 | 4 | 6 |
| Stock OUT | 3 | 4 | 5 |
| Customer Sale Permission | 3 | 4 | 4 |
| **Total** | | | **15** |

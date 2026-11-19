# Boundary Value Analysis (BVA)

**Module:** Authentication, Product Management, Sales, Payment
**Technique:** Boundary Value Analysis
**Tester:** Student 1 — Test Analyst

---

## Overview

Boundary Value Analysis (BVA) is a black-box testing technique that focuses on values at and immediately around the boundaries of valid input ranges. Defects are more likely to occur at boundary conditions than within the interior of an equivalence class.

**Strategy:** For each input range [min, max], test: min-1, min, min+1, typical, max-1, max, max+1

---

## 1. Password Length — Registration

**Requirement (FR-01.1):** Password must be at least 6 characters.
**Boundary:** min = 6, max = unlimited (no upper bound defined)

| TC# | Input Value | Length | Classification | Expected Result | Actual Result | Pass/Fail |
|-----|------------|--------|---------------|----------------|---------------|-----------|
| BVA-TC01 | `""` | 0 | Below min | ❌ 400: Password required | — | — |
| BVA-TC02 | `"abcde"` | 5 | min − 1 | ❌ 400: Password too short | — | — |
| BVA-TC03 | `"abcdef"` | 6 | min (boundary) | ✅ 201: Account created | — | — |
| BVA-TC04 | `"abcdefg"` | 7 | min + 1 | ✅ 201: Account created | — | — |
| BVA-TC05 | `"abcdefghij"` | 10 | Typical | ✅ 201: Account created | — | — |

---

## 2. Product costPrice

**Requirement (FR-03.2):** costPrice ≥ 0
**Boundary:** min = 0

| TC# | Input Value | Classification | Expected Result | Actual Result | Pass/Fail |
|-----|------------|---------------|----------------|---------------|-----------|
| BVA-TC06 | -1 | min − 1 | ❌ 400: min 0 | — | — |
| BVA-TC07 | 0 | min (boundary) | ✅ 201: Product created | — | — |
| BVA-TC08 | 1 | min + 1 | ✅ 201: Product created | — | — |
| BVA-TC09 | 500 | Typical | ✅ 201: Product created | — | — |
| BVA-TC10 | 999999 | Large value | ✅ 201: Product created | — | — |

---

## 3. Product sellingPrice

**Requirement (FR-03.2):** sellingPrice ≥ 0
**Boundary:** min = 0

| TC# | Input Value | Classification | Expected Result | Actual Result | Pass/Fail |
|-----|------------|---------------|----------------|---------------|-----------|
| BVA-TC11 | -1 | min − 1 | ❌ 400: min 0 | — | — |
| BVA-TC12 | 0 | min (boundary) | ✅ 201: Product created | — | — |
| BVA-TC13 | 1 | min + 1 | ✅ 201: Product created | — | — |
| BVA-TC14 | 999 | Typical | ✅ 201: Product created | — | — |

---

## 4. Product quantity

**Requirement (FR-03.2):** quantity ≥ 0
**Boundary:** min = 0

| TC# | Input Value | Classification | Expected Result | Actual Result | Pass/Fail |
|-----|------------|---------------|----------------|---------------|-----------|
| BVA-TC15 | -1 | min − 1 | ❌ 400: min 0 | — | — |
| BVA-TC16 | 0 | min (boundary) | ✅ 201: Product created | — | — |
| BVA-TC17 | 1 | min + 1 | ✅ 201: Product created | — | — |
| BVA-TC18 | 100 | Typical | ✅ 201: Product created | — | — |

---

## 5. Sale Item Quantity

**Requirement (FR-06.1):** Each sale item must have quantity ≥ 1
**Boundary:** min = 1; max = availableStock (let's say stock = 10)

| TC# | Input Value | Classification | Expected Result | Actual Result | Pass/Fail |
|-----|------------|---------------|----------------|---------------|-----------|
| BVA-TC19 | 0 | min − 1 | ❌ 400: min 1 | — | — |
| BVA-TC20 | 1 | min (boundary) | ✅ Sale created | — | — |
| BVA-TC21 | 2 | min + 1 | ✅ Sale created | — | — |
| BVA-TC22 | 9 | max − 1 (stock=10) | ✅ Sale created | — | — |
| BVA-TC23 | 10 | max (boundary, all stock) | ✅ Sale created, stock → 0 | — | — |
| BVA-TC24 | 11 | max + 1 (over stock) | ❌ 400: Insufficient stock | — | — |

---

## 6. Payment Amount

**Requirement (FR-07.4):** payment amount ≥ 1
**Boundary:** min = 1

| TC# | Input Value | Classification | Expected Result | Actual Result | Pass/Fail |
|-----|------------|---------------|----------------|---------------|-----------|
| BVA-TC25 | 0 | min − 1 | ❌ 400: min 1 | — | — |
| BVA-TC26 | 1 | min (boundary) | ✅ Payment created | — | — |
| BVA-TC27 | 2 | min + 1 | ✅ Payment created | — | — |
| BVA-TC28 | 10000 | Large typical | ✅ Payment created | — | — |

---

## BVA Summary Table

| Module | Field | Min Boundary | Test Values | Total TCs |
|--------|-------|-------------|-------------|-----------|
| Auth | password length | 6 chars | 0, 5, 6, 7, 10 | 5 |
| Product | costPrice | 0 | -1, 0, 1, 500, 999999 | 5 |
| Product | sellingPrice | 0 | -1, 0, 1, 999 | 4 |
| Product | quantity | 0 | -1, 0, 1, 100 | 4 |
| Sale | item quantity | 1 (max=stock) | 0, 1, 2, 9, 10, 11 | 6 |
| Payment | amount | 1 | 0, 1, 2, 10000 | 4 |
| **Total** | | | | **28** |

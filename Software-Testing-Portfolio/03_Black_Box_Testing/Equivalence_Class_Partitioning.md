# Equivalence Class Partitioning (ECP)

**Module:** Authentication, Product Management, Customer Management
**Technique:** Equivalence Class Partitioning
**Tester:** Student 1 — Test Analyst

---

## Overview

Equivalence Class Partitioning divides input data into groups (classes) where all values in a class are expected to produce the same result. We test one representative value from each class — this reduces the number of test cases while maintaining good coverage.

**Principles:**
- If a test case in a class reveals a defect, all other cases in that class likely would too
- If a test case in a class does not reveal a defect, neither would the others

---

## Module 1: User Registration (`POST /api/auth/register`)

### Equivalence Classes

| Field | Valid Class (VC) | Invalid Classes (IC) |
|-------|-----------------|----------------------|
| name | VC1: Non-empty string (e.g., "John") | IC1: Empty string `""` / IC2: Only whitespace `"   "` |
| email | VC2: Valid format `x@domain.ext` | IC3: No @ symbol / IC4: No domain / IC5: Empty |
| password | VC3: 6 or more characters | IC6: Less than 6 chars / IC7: Empty string |

### Test Cases

| TC# | Test Case Name | name | email | password | Expected Result | Actual Result | Pass/Fail |
|-----|---------------|------|-------|----------|----------------|---------------|-----------|
| ECP-TC01 | Valid Registration | "John Doe" | "john@email.com" | "pass123" | 201 Created, `{success:true, data:{user, token}}` | — | — |
| ECP-TC02 | Empty Name (IC1) | `""` | "john@email.com" | "pass123" | 400 Error: Name required | — | — |
| ECP-TC03 | Whitespace Name (IC2) | `"   "` | "john@email.com" | "pass123" | 400 Error: Name required | — | — |
| ECP-TC04 | No @ in Email (IC3) | "John" | "johnemail.com" | "pass123" | 400 Error: Invalid email | — | — |
| ECP-TC05 | No domain in Email (IC4) | "John" | "john@" | "pass123" | 400 Error: Invalid email | — | — |
| ECP-TC06 | Empty Email (IC5) | "John" | `""` | "pass123" | 400 Error: Email required | — | — |
| ECP-TC07 | Short Password (IC6) | "John" | "john@email.com" | "abc" | 400 Error: Password min 6 chars | — | — |
| ECP-TC08 | Empty Password (IC7) | "John" | "john@email.com" | `""` | 400 Error: Password required | — | — |
| ECP-TC09 | Duplicate Email | "Jane" | "john@email.com" | "pass456" | 400 Error: Email already exists | — | — |
| ECP-TC10 | All valid (new unique user) | "Alice" | "alice@test.com" | "mypassword" | 201 Created | — | — |

---

## Module 2: User Login (`POST /api/auth/login`)

### Equivalence Classes

| Field | Valid Class | Invalid Classes |
|-------|------------|----------------|
| email | VC1: Registered email | IC1: Unregistered email / IC2: Empty / IC3: Invalid format |
| password | VC2: Correct password for user | IC4: Wrong password / IC5: Empty |

### Test Cases

| TC# | Test Case Name | email | password | Expected Result | Actual Result | Pass/Fail |
|-----|---------------|-------|----------|----------------|---------------|-----------|
| ECP-TC11 | Valid Login (VC1+VC2) | "john@email.com" | "pass123" | 200 OK, token returned | — | — |
| ECP-TC12 | Unregistered Email (IC1) | "ghost@email.com" | "pass123" | 400 Error: Invalid credentials | — | — |
| ECP-TC13 | Wrong Password (IC4) | "john@email.com" | "wrongpass" | 400 Error: Invalid credentials | — | — |
| ECP-TC14 | Empty Email (IC2) | `""` | "pass123" | 400 Error: Email required | — | — |
| ECP-TC15 | Empty Password (IC5) | "john@email.com" | `""` | 400 Error: Password required | — | — |

---

## Module 3: Product Creation (`POST /api/product`)

### Equivalence Classes

| Field | Valid Class | Invalid Classes |
|-------|------------|----------------|
| name | VC1: Non-empty string | IC1: Empty string |
| category | VC2: Valid ObjectId (existing category) | IC2: Missing / IC3: Invalid ObjectId format |
| costPrice | VC3: Number ≥ 0 | IC4: Negative number / IC5: Non-numeric string |
| sellingPrice | VC4: Number ≥ 0 | IC6: Negative number / IC7: Non-numeric string |
| quantity | VC5: Integer ≥ 0 | IC8: Negative integer |

### Test Cases

| TC# | Test Case Name | Input | Expected Result | Actual Result | Pass/Fail |
|-----|---------------|-------|----------------|---------------|-----------|
| ECP-TC16 | Valid Product (all VC) | All valid values | 201 Created | — | — |
| ECP-TC17 | Empty Product Name (IC1) | name: `""` | 400 Error: Name required | — | — |
| ECP-TC18 | Missing Category (IC2) | No category field | 400 Error: Category required | — | — |
| ECP-TC19 | Negative Cost Price (IC4) | costPrice: -100 | 400 Error: min 0 | — | — |
| ECP-TC20 | Negative Quantity (IC8) | quantity: -5 | 400 Error: min 0 | — | — |
| ECP-TC21 | Zero Cost Price (VC3 boundary) | costPrice: 0 | 201 Created | — | — |
| ECP-TC22 | Zero Quantity (VC5 boundary) | quantity: 0 | 201 Created | — | — |
| ECP-TC23 | Non-numeric Price (IC5) | costPrice: "abc" | 400 Error: invalid type | — | — |

---

## Module 4: Customer Registration (`POST /api/customers`)

### Equivalence Classes

| Field | Valid Class | Invalid Classes |
|-------|------------|----------------|
| name | VC1: Non-empty string | IC1: Empty |
| phone | VC2: Unique phone string | IC2: Duplicate phone / IC3: Empty |
| email | VC3: Valid email or empty string | IC4: Invalid email format |

### Test Cases

| TC# | Test Case Name | Input | Expected Result | Actual Result | Pass/Fail |
|-----|---------------|-------|----------------|---------------|-----------|
| ECP-TC24 | Valid Customer (all VC) | All valid values | 201 Created | — | — |
| ECP-TC25 | Duplicate Phone (IC2) | Same phone as existing customer | 400 Duplicate error | — | — |
| ECP-TC26 | Empty Name (IC1) | name: `""` | 400 Error: Name required | — | — |
| ECP-TC27 | Empty Phone (IC3) | phone: `""` | 400 Error: Phone required | — | — |
| ECP-TC28 | No Email (optional field) | Email field omitted | 201 Created (email defaults to "") | — | — |

---

## ECP Summary

| Module | Valid Classes Tested | Invalid Classes Tested | Total TCs |
|--------|--------------------|-----------------------|-----------|
| Registration | 1 | 8 | 10 |
| Login | 1 | 4 | 5 |
| Product | 5 | 7 | 8 |
| Customer | 3 | 4 | 5 |
| **Total** | **10** | **23** | **28** |

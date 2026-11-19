# API Testing Results

**Tool:** Postman
**Base URL:** `http://localhost:9696/api`
**Tester:** Student 2 — Test Engineer
**Date:** November 2026

---

## Setup Instructions

1. Import `Postman_Collection.json` into Postman
2. Create a Postman Environment with variable: `base_url = http://localhost:9696/api`
3. Run `POST /auth/login` first — the collection auto-sets `{{token}}` via test script:

```javascript
// Auto-set token after login (paste in Postman Tests tab)
if (pm.response.code === 200) {
    const data = pm.response.json();
    pm.environment.set("token", data.data.token);
}
```

4. All protected routes use `Authorization: Bearer {{token}}` header

---

## 1. Authentication — POST /auth/register

| TC# | Description | Request Body | Expected Status | Expected Body | Actual Status | Pass/Fail |
|-----|------------|-------------|----------------|--------------|--------------|-----------|
| API-TC01 | Valid registration | `{"name":"John","email":"john@test.com","password":"pass123"}` | 201 | `{success:true, data:{user, token}}` | — | — |
| API-TC02 | Duplicate email | Same email as TC01 | 400 | `{success:false, message:"...already exists"}` | — | — |
| API-TC03 | Missing name | `{"email":"a@b.com","password":"pass123"}` | 400 | Error: Name required | — | — |
| API-TC04 | Missing email | `{"name":"John","password":"pass123"}` | 400 | Error: Email required | — | — |
| API-TC05 | Missing password | `{"name":"John","email":"a@b.com"}` | 400 | Error: Password required | — | — |
| API-TC06 | Password < 6 chars | `{"name":"John","email":"b@b.com","password":"abc"}` | 400 | Error: min 6 characters | — | — |
| API-TC07 | Empty body `{}` | `{}` | 400 | Error response | — | — |

---

## 2. Authentication — POST /auth/login

| TC# | Description | Request Body | Expected Status | Actual Status | Pass/Fail |
|-----|------------|-------------|----------------|--------------|-----------|
| API-TC08 | Valid login | `{"email":"john@test.com","password":"pass123"}` | 200 | — | — |
| API-TC09 | Wrong password | `{"email":"john@test.com","password":"wrongpass"}` | 400 | — | — |
| API-TC10 | Unregistered email | `{"email":"ghost@test.com","password":"pass123"}` | 400 | — | — |
| API-TC11 | Missing password | `{"email":"john@test.com"}` | 400 | — | — |
| API-TC12 | Missing email | `{"password":"pass123"}` | 400 | — | — |
| API-TC13 | Empty body | `{}` | 400 | — | — |

---

## 3. Auth Profile — GET /auth/profile

| TC# | Description | Headers | Expected Status | Actual | Pass/Fail |
|-----|------------|---------|----------------|--------|-----------|
| API-TC14 | With valid token | `Authorization: Bearer {{token}}` | 200, user data | — | — |
| API-TC15 | Without token | No Authorization header | 401 | — | — |
| API-TC16 | Invalid token | `Authorization: Bearer invalidtoken` | 401 | — | — |

---

## 4. Product — GET /product

| TC# | Description | Headers | Expected Status | Actual | Pass/Fail |
|-----|------------|---------|----------------|--------|-----------|
| API-TC17 | List all products (authenticated) | Bearer token | 200, array | — | — |
| API-TC18 | No token | None | 401 | — | — |

---

## 5. Product — POST /product

| TC# | Description | Body | Expected Status | Actual | Pass/Fail |
|-----|------------|------|----------------|--------|-----------|
| API-TC19 | Valid product | `{name, category, costPrice, sellingPrice, quantity}` | 201 | — | — |
| API-TC20 | Missing name | No name field | 400 | — | — |
| API-TC21 | Missing category | No category field | 400 | — | — |
| API-TC22 | Negative costPrice | `costPrice: -100` | 400 | — | — |
| API-TC23 | Negative quantity | `quantity: -1` | 400 | — | — |
| API-TC24 | Zero costPrice (valid boundary) | `costPrice: 0` | 201 | — | — |

---

## 6. Product — DELETE /product/:id (Soft Delete)

| TC# | Description | Expected Status | Actual | Pass/Fail |
|-----|------------|----------------|--------|-----------|
| API-TC25 | Valid product ID | 200, `isDeleted:true` | — | — |
| API-TC26 | Non-existent product ID | 404 | — | — |
| API-TC27 | Invalid ObjectId format | 400/500 | — | — |

---

## 7. Inventory — POST /inventory/stock-in

| TC# | Description | Body | Expected Status | Actual | Pass/Fail |
|-----|------------|------|----------------|--------|-----------|
| API-TC28 | Valid stock IN | `{productId, quantity: 10}` | 200/201 | — | — |
| API-TC29 | Quantity = 0 | `{productId, quantity: 0}` | 400 | — | — |
| API-TC30 | Negative quantity | `{productId, quantity: -5}` | 400 | — | — |

---

## 8. Inventory — POST /inventory/stock-out

| TC# | Description | Body | Expected Status | Actual | Pass/Fail |
|-----|------------|------|----------------|--------|-----------|
| API-TC31 | Valid stock OUT (within stock) | `{productId, quantity: 2}` | 200/201 | — | — |
| API-TC32 | Quantity > available stock | `{productId, quantity: 9999}` | 400 | — | — |

---

## 9. Customer — POST /customers

| TC# | Description | Body | Expected Status | Actual | Pass/Fail |
|-----|------------|------|----------------|--------|-----------|
| API-TC33 | Valid customer | `{name, phone, email, address}` | 201 | — | — |
| API-TC34 | Duplicate phone | Same phone as existing | 400 | — | — |
| API-TC35 | Missing name | No name | 400 | — | — |

---

## 10. Sales — POST /sale

| TC# | Description | Body | Expected Status | Actual | Pass/Fail |
|-----|------------|------|----------------|--------|-----------|
| API-TC36 | Valid sale — 1 item, fully paid | Complete sale body | 201 | — | — |
| API-TC37 | Valid sale — multi-item, partial | Multi-item, partial payment | 201 | — | — |
| API-TC38 | No items array | `{customer, items: []}` | 400 | — | — |
| API-TC39 | Missing customer | No customer field | 400 | — | — |
| API-TC40 | Insufficient stock | Qty > product stock | 400 | — | — |

---

## 11. Payment — POST /payments

| TC# | Description | Body | Expected Status | Actual | Pass/Fail |
|-----|------------|------|----------------|--------|-----------|
| API-TC41 | Valid payment — CASH | `{customer, amount: 500, paymentMethod: "CASH"}` | 201 | — | — |
| API-TC42 | Valid payment — UPI | `{customer, amount: 200, paymentMethod: "UPI"}` | 201 | — | — |
| API-TC43 | Amount = 0 | `{..., amount: 0}` | 400 | — | — |
| API-TC44 | Invalid payment method | `{..., paymentMethod: "CRYPTO"}` | 400 | — | — |

---

## Test Results Summary

| Module | Total TCs | Passed | Failed | Blocked |
|--------|----------|--------|--------|---------|
| Auth Register | 7 | — | — | — |
| Auth Login | 6 | — | — | — |
| Auth Profile | 3 | — | — | — |
| Product | 8 | — | — | — |
| Inventory | 5 | — | — | — |
| Customer | 3 | — | — | — |
| Sales | 5 | — | — | — |
| Payment | 4 | — | — | — |
| **Total** | **41** | — | — | — |

> Fill Passed/Failed/Blocked columns after executing each test in Postman.
> Export collection and results screenshot to `05_API_Testing/` and `09_Evidence/screenshots/`.

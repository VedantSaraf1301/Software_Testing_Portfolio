# Basis Path Testing

**Function:** `loginUser()` and `registerUser()` in `Backend/src/services/auth.service.js`
**Tester:** Student 2 — Test Engineer

---

## Overview

Basis Path Testing uses the **Cyclomatic Complexity** number to identify the minimum set of **linearly independent paths** through the code that guarantee full branch coverage. Each basis path exercises a unique logical decision in the code.

**Formula:** V(G) = Number of decisions + 1 = Minimum number of test cases required for full branch coverage

---

## Function 1: loginUser()

**Cyclomatic Complexity:** V(G) = 4
**Number of Basis Paths:** 4

### Independent Paths

| Path # | Node Sequence | Condition Exercised | Description |
|--------|-------------|---------------------|-------------|
| **Path 1** | 1 → 2 → 3 | D1 = TRUE | email or password is empty |
| **Path 2** | 1 → 2 → 4 → 5 → 6 | D1=false, D2=TRUE | Valid input but user not found |
| **Path 3** | 1 → 2 → 4 → 5 → 7 → 8 → 9 | D1=false, D2=false, D3=TRUE | User found but wrong password |
| **Path 4** | 1 → 2 → 4 → 5 → 7 → 8 → 10 → 11 → 12 | All decisions FALSE | Full success path |

### Test Cases for loginUser()

| TC# | Path | Input | Expected Output | Actual | Pass/Fail |
|-----|------|-------|----------------|--------|-----------|
| BP-TC01 | Path 1 | `{email: "", password: "pass123"}` | 400: "Email and Password are required" | — | — |
| BP-TC02 | Path 1 | `{email: "john@test.com", password: ""}` | 400: "Email and Password are required" | — | — |
| BP-TC03 | Path 2 | `{email: "ghost@test.com", password: "pass123"}` | 400: "Invalid Email or Password" | — | — |
| BP-TC04 | Path 3 | `{email: "john@test.com", password: "wrongpass"}` | 400: "Invalid Email or Password" | — | — |
| BP-TC05 | Path 4 | `{email: "john@test.com", password: "pass123"}` | 200: `{user: {...}, token: "jwt..."}` | — | — |

---

## Function 2: registerUser()

**Cyclomatic Complexity:** V(G) = 4
**Number of Basis Paths:** 4

### Independent Paths

| Path # | Node Sequence | Condition Exercised | Description |
|--------|-------------|---------------------|-------------|
| **Path 1** | 1 → 2 → 3 | D1 = TRUE | name, email, or password missing |
| **Path 2** | 1 → 2 → 4 → 5 → 6 | D1=false, D2=TRUE | Email already exists |
| **Path 3** | 1 → 2 → 4 → 5 → 7 → 8 | D1=false, D2=false, D3=TRUE | Password too short |
| **Path 4** | 1 → 2 → 4 → 5 → 7 → 9 → 10 → 11 → 12 → 13 | All FALSE | Full success path |

### Test Cases for registerUser()

| TC# | Path | Input | Expected Output | Actual | Pass/Fail |
|-----|------|-------|----------------|--------|-----------|
| BP-TC06 | Path 1 | `{name: "", email: "a@b.com", password: "pass123"}` | 400: "fields required" | — | — |
| BP-TC07 | Path 2 | `{name: "John", email: "existing@b.com", password: "pass123"}` | 400: "email already exists" | — | — |
| BP-TC08 | Path 3 | `{name: "John", email: "new@b.com", password: "abc"}` | 400: "min 6 characters" | — | — |
| BP-TC09 | Path 4 | `{name: "John", email: "new@b.com", password: "pass123"}` | 201: `{user: {...}, token: "jwt..."}` | — | — |

---

## Coverage Analysis

### loginUser() — Branch Coverage Matrix

| Decision Point | Test Cases Covering TRUE | Test Cases Covering FALSE |
|---------------|-------------------------|--------------------------|
| D1: `!email \|\| !password` | BP-TC01, BP-TC02 | BP-TC03, BP-TC04, BP-TC05 |
| D2: `!user` | BP-TC03 | BP-TC04, BP-TC05 |
| D3: `!isPasswordMatched` | BP-TC04 | BP-TC05 |

✅ All branches covered

### registerUser() — Branch Coverage Matrix

| Decision Point | Test Cases Covering TRUE | Test Cases Covering FALSE |
|---------------|-------------------------|--------------------------|
| D1: `!name \|\| !email \|\| !password` | BP-TC06 | BP-TC07, BP-TC08, BP-TC09 |
| D2: `existing` (duplicate) | BP-TC07 | BP-TC08, BP-TC09 |
| D3: `password.length < 6` | BP-TC08 | BP-TC09 |

✅ All branches covered

---

## Basis Path Test Summary

| Function | V(G) | Paths Identified | Test Cases Written | Branch Coverage |
|---------|------|-----------------|-------------------|----------------|
| loginUser() | 4 | 4 | 5 | 100% |
| registerUser() | 4 | 4 | 4 | 100% |
| **Total** | | **8** | **9** | **100%** |

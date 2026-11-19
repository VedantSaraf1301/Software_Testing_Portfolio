# Code Coverage Report

**Tool:** c8 (Node.js coverage — Istanbul compatible)
**Target:** `Backend/src/services/auth.service.js`, `Backend/src/utils/generateToken.utils.js`
**Tester:** Student 2 — Test Engineer

---

## How to Generate Coverage Report

### Step 1: Install dependencies

```bash
cd Backend
npm install --save-dev jest supertest c8
```

### Step 2: Create Jest config

Add to `Backend/package.json`:
```json
{
  "jest": {
    "testEnvironment": "node"
  }
}
```

### Step 3: Run tests with coverage

```bash
# Generate text + HTML coverage report
npx c8 --reporter=text --reporter=html npx jest tests/auth.test.js

# View HTML report
open coverage/index.html
```

---

## Coverage Results

> **Note:** Fill the Actual columns below after running the coverage command and paste a screenshot in `09_Evidence/screenshots/coverage-report.png`

### auth.service.js

| Metric | Lines | Statements | Branches | Functions |
|--------|-------|-----------|---------|----------|
| Total | — | — | — | — |
| Covered | — | — | — | — |
| **Coverage %** | **—%** | **—%** | **—%** | **—%** |

### generateToken.utils.js

| Metric | Coverage % |
|--------|-----------|
| Statements | — |
| Branches | — |
| Functions | — |

---

## Expected Coverage by Basis Path Tests

### loginUser() — Statement Coverage

| Statement | Covered By Test Case | Expected Coverage |
|-----------|---------------------|------------------|
| `const { email, password } = loginData` | BP-TC01 to BP-TC05 | ✅ |
| `if (!email \|\| !password)` | BP-TC01 to BP-TC05 | ✅ |
| `throw new Error("fields required")` | BP-TC01, BP-TC02 | ✅ |
| `const user = await User.findOne(...)` | BP-TC03 to BP-TC05 | ✅ |
| `if (!user)` | BP-TC03 to BP-TC05 | ✅ |
| `throw new Error("Invalid Email...")` (user not found) | BP-TC03 | ✅ |
| `const isPasswordMatched = await bcrypt.compare(...)` | BP-TC04, BP-TC05 | ✅ |
| `if (!isPasswordMatched)` | BP-TC04, BP-TC05 | ✅ |
| `throw new Error("Invalid Email...")` (wrong pass) | BP-TC04 | ✅ |
| `const token = generateToken(user._id)` | BP-TC05 | ✅ |
| `return { user: userData, token }` | BP-TC05 | ✅ |

**Expected Statement Coverage: 100%**
**Expected Branch Coverage: 100%**

### registerUser() — Branch Coverage

| Branch | True Covered By | False Covered By |
|--------|----------------|-----------------|
| `!name \|\| !email \|\| !password` | BP-TC06 | BP-TC07,08,09 |
| `existing` (email duplicate) | BP-TC07 | BP-TC08,09 |
| `password.length < 6` | BP-TC08 | BP-TC09 |

**Expected Branch Coverage: 100%**

---

## Coverage Summary Table

| File | Statement | Branch | Function | Line |
|------|----------|--------|---------|------|
| auth.service.js (loginUser) | 100% | 100% | 100% | 100% |
| auth.service.js (registerUser) | 100% | 100% | 100% | 100% |
| generateToken.utils.js | 100% | 50%* | 100% | 100% |

> *generateToken.utils.js has branch `process.env.JWT_EXPIRES_IN || "7d"` — 50% branch coverage unless both env-set and env-unset scenarios are tested.

---

## Screenshot Evidence

After running coverage:
1. Take a screenshot of the terminal output showing coverage percentages
2. Take a screenshot of the HTML coverage report (`coverage/index.html`)
3. Save both to `09_Evidence/screenshots/`

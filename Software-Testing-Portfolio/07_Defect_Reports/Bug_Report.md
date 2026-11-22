# Defect / Bug Report

**Application:** Inventro — MERN Inventory Manager
**Tester:** Student 2 — Test Engineer
**Date:** November 2026
**Total Bugs Found:** 6

---

## Bug Report Template

| Field | Description |
|-------|------------|
| Bug ID | Unique identifier (BUG-XXX) |
| Title | Short, descriptive title |
| Module | Affected module/component |
| Severity | Critical / Major / Minor / Trivial |
| Priority | High / Medium / Low |
| Steps to Reproduce | Exact numbered steps |
| Expected Result | What should happen per requirements |
| Actual Result | What actually happened |
| Root Cause | Code/config location of the bug |
| Status | Open / Fixed / Closed / Re-open |
| Screenshot | Reference to evidence file |

---

## BUG-001 — JWT Stack Trace Exposed in Error Response

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-001 |
| **Title** | JWT authentication error response exposes full stack trace |
| **Module** | Authentication Middleware |
| **Severity** | Major |
| **Priority** | High |
| **Environment** | Backend — Node.js / Express |

**Steps to Reproduce:**
1. Start the backend server (`npm run dev`)
2. Send a GET request to `http://localhost:9696/api/product` using Postman
3. Set `Authorization` header to `Bearer invalidtoken123`
4. Inspect the JSON response body

**Expected Result:**
```json
{ "success": false, "message": "Invalid or expired token" }
```

**Actual Result:**
```json
{
  "success": false,
  "error": "jwt malformed",
  "stack": "JsonWebTokenError: jwt malformed\n    at /path/to/node_modules/jsonwebtoken/...\n    at C:\\Users\\...\\Backend\\src\\middleware\\auth.middleware.js:14:..."
}
```

**Root Cause:**
`Backend/src/middleware/auth.middleware.js` — line 41:
```javascript
return res.status(401).json({
  success: false,
  error: error.message,
  stack: error.stack,   // ← exposes internals
});
```

**Impact:** Attackers can use stack trace information to discover internal file paths, Node.js version, and middleware structure — aiding targeted attacks.

**Recommendation:** Remove `stack` from error response in production. Use a generic message instead.

**Status:** Open
**Screenshot:** `09_Evidence/screenshots/BUG-001-stack-trace.png`

---

## BUG-002 — No Rate Limiting on Login/Register Endpoints

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-002 |
| **Title** | No rate limiting on authentication endpoints — brute-force attack possible |
| **Module** | Authentication |
| **Severity** | Major |
| **Priority** | High |

**Steps to Reproduce:**
1. Send 50 consecutive POST requests to `http://localhost:9696/api/auth/login` with wrong passwords
2. Observe that all 50 requests return 400 (processed normally) with no throttling or block

**Expected Result:**
After N failed attempts (e.g. 5), the server should return `429 Too Many Requests` and temporarily block the IP.

**Actual Result:**
All 50 requests are processed — no rate limiting or account lockout mechanism exists.

**Root Cause:**
No `express-rate-limit` or similar middleware is applied in `Backend/src/app.js` or `auth.routes.js`.

**Recommendation:**
```bash
npm install express-rate-limit
```
```javascript
const rateLimit = require('express-rate-limit');
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
router.post('/login', authLimiter, loginUser);
```

**Status:** Open

---

## BUG-003 — Inventory `createdBy` Stored as String Instead of ObjectId

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-003 |
| **Title** | `Inventory.createdBy` field uses String type instead of ObjectId reference |
| **Module** | Inventory Management — Data Model |
| **Severity** | Minor |
| **Priority** | Medium |

**Steps to Reproduce:**
1. Record a Stock IN movement via POST `/api/inventory/stock-in`
2. Query the inventory record in MongoDB Compass or Atlas
3. Inspect the `createdBy` field type

**Expected Result:**
`createdBy` should be of type `ObjectId` referencing the `User` collection — consistent with all other models (Sale, Payment, Customer).

**Actual Result:**
`createdBy` is stored as a plain `String` — cannot be `populate()`d with Mongoose, breaking any user-linked inventory query.

**Root Cause:**
`Backend/src/models/inventory.model.js` — line 25–27:
```javascript
createdBy: {
  type: String,   // ← should be mongoose.Schema.Types.ObjectId
  required: false,
}
```

**Recommendation:**
```javascript
createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false,
}
```

**Status:** Open

---

## BUG-004 — CORS Origin Uses HTTPS Instead of HTTP for Localhost

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-004 |
| **Title** | CORS configuration uses `https://localhost:5173` but Vite serves on `http://` |
| **Module** | Backend Configuration — CORS |
| **Severity** | Major |
| **Priority** | High |

**Steps to Reproduce:**
1. Start frontend with `npm run dev` (serves on `http://localhost:5173`)
2. Open browser and attempt to login
3. Open browser DevTools → Console/Network tab
4. Observe CORS error: `Access-Control-Allow-Origin` does not match

**Expected Result:** API requests from `http://localhost:5173` should succeed.

**Actual Result:** Browser blocks all API requests due to CORS mismatch.

**Root Cause:**
`Backend/src/app.js` — line 20:
```javascript
origin: ["https://localhost:5173", ...]  // ← https vs http mismatch
```

**Status:** ✅ **Fixed** — changed to `http://localhost:5173`

---

## BUG-005 — Application Crashes When JWT_EXPIRES_IN Is Not Set

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-005 |
| **Title** | Backend crashes on login/register if `JWT_EXPIRES_IN` env variable is missing |
| **Module** | Authentication — Token Generation |
| **Severity** | Critical |
| **Priority** | High |

**Steps to Reproduce:**
1. Remove `JWT_EXPIRES_IN` from `Backend/.env`
2. Start backend with `npm run dev`
3. Attempt to register or login

**Expected Result:** Application should use a default expiry (e.g., `"7d"`) and work normally.

**Actual Result:**
```
Error: "expiresIn" should be a number of seconds or string representing a timespan
```
Application crashes, login/register completely broken.

**Root Cause:**
`Backend/src/utils/generateToken.utils.js`:
```javascript
expiresIn: process.env.JWT_EXPIRES_IN  // undefined if not set
```

**Status:** ✅ **Fixed** — added fallback `|| "7d"`:
```javascript
expiresIn: process.env.JWT_EXPIRES_IN || "7d"
```

---

## BUG-006 — Frontend Axios BaseURL Undefined Without VITE_API_URL

| Field | Detail |
|-------|--------|
| **Bug ID** | BUG-006 |
| **Title** | All API calls fail with 404 when `VITE_API_URL` is not set in Frontend `.env` |
| **Module** | Frontend — API Configuration |
| **Severity** | Critical |
| **Priority** | High |

**Steps to Reproduce:**
1. Ensure `VITE_API_URL` is NOT set in `Frontend/.env` (or no `.env` file exists)
2. Start frontend and attempt to login
3. Open Network tab in browser DevTools
4. Observe request URL

**Expected Result:** Requests should go to `http://localhost:9696/api/auth/login` via Vite proxy.

**Actual Result:** Request sent to `undefined/auth/login` → 404 Not Found.

**Root Cause:**
`Frontend/src/api/axios.js`:
```javascript
baseURL: import.meta.env.VITE_API_URL  // undefined when env not set
```

**Status:** ✅ **Fixed** — added fallback `|| "/api"`:
```javascript
baseURL: import.meta.env.VITE_API_URL || "/api"
```

---

## Defect Summary Table

| Bug ID | Title (Short) | Module | Severity | Priority | Status |
|--------|--------------|--------|---------|---------|--------|
| BUG-001 | Stack trace in JWT error | Auth Middleware | Major | High | 🔴 Open |
| BUG-002 | No rate limiting on login | Authentication | Major | High | 🔴 Open |
| BUG-003 | Inventory.createdBy wrong type | Inventory Model | Minor | Medium | 🟡 Open |
| BUG-004 | CORS https vs http mismatch | Backend Config | Major | High | ✅ Fixed |
| BUG-005 | JWT_EXPIRES_IN crash | Token Utils | Critical | High | ✅ Fixed |
| BUG-006 | Axios baseURL undefined | Frontend Config | Critical | High | ✅ Fixed |

### Distribution by Severity

| Severity | Count | Fixed | Open |
|---------|-------|-------|------|
| Critical | 2 | 2 | 0 |
| Major | 3 | 1 | 2 |
| Minor | 1 | 0 | 1 |
| **Total** | **6** | **3** | **3** |

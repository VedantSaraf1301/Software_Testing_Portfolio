# State Transition Testing

**Module:** Customer Account, Product Lifecycle, Sale Payment Status
**Technique:** State Transition Testing
**Tester:** Student 1 — Test Analyst

---

## Overview

State Transition Testing models the system as a **finite state machine**. It tests:
- Valid transitions (allowed state changes)
- Invalid transitions (state changes that should be rejected)
- Entry and exit conditions for each state

---

## 1. Customer Account — States & Transitions

### State Diagram

```
                    changeStatus(false)
         ┌─────────────────────────────────────┐
         │                                     ▼
    [Active] ◄──────────────────────── [Inactive]
         │      changeStatus(true)
         │
         ├──── createSale() ──────► [Active] (balance ↑)
         │
         └──── receivePayment() ──► [Active] (balance ↓)
```

### State Transition Table

| Current State | Event / Input | Next State | Expected Output |
|--------------|--------------|-----------|----------------|
| Active | changeStatus(false) | Inactive | 200 OK, status=false |
| Inactive | changeStatus(true) | Active | 200 OK, status=true |
| Active | createSale(items, amount) | Active | 201 Sale created, balance+=dueAmount |
| Inactive | createSale(items, amount) | Inactive | 400 Error: Customer inactive |
| Active | receivePayment(amount) | Active | 200 OK, balance decreases |

### Test Cases

| TC# | Initial State | Action | Expected Next State | Expected Output | Actual | Pass/Fail |
|-----|-------------|--------|--------------------|-----------------|----|--|
| ST-TC01 | Active | Deactivate | Inactive | 200, status=false | — | — |
| ST-TC02 | Inactive | Activate | Active | 200, status=true | — | — |
| ST-TC03 | Active | Create sale | Active | 201, sale created | — | — |
| ST-TC04 | Inactive | Create sale | Inactive | 400, error | — | — |
| ST-TC05 | Active | Receive payment | Active | 200, balance reduced | — | — |
| ST-TC06 | Active → Inactive → Active | Re-enable | Active | 200, back to active | — | — |

---

## 2. Product Lifecycle — States & Transitions

### State Diagram

```
    [Active] ──── softDelete() ────► [Deleted]
       ▲                                 │
       └──────── restore() ─────────────┘

    [Active] ──── updateProduct() ──► [Active] (data updated)
    [Deleted] ─── usedInSale() ──────► Error (rejected)
```

### State Transition Table

| Current State | Event | Next State | Expected Output |
|--------------|-------|-----------|----------------|
| Active | Soft delete | Deleted | 200 OK, isDeleted=true |
| Deleted | Restore | Active | 200 OK, isDeleted=false |
| Active | Update fields | Active | 200 OK, fields updated |
| Deleted | Attempt to use in sale | Deleted | 400 Error: Product unavailable |
| Active | Delete + Restore + Delete | Deleted | 200 OK, isDeleted=true |

### Test Cases

| TC# | Initial State | Action | Expected Next State | Actual | Pass/Fail |
|-----|-------------|--------|--------------------|----|--|
| ST-TC07 | Active | Soft delete | Deleted (isDeleted=true) | — | — |
| ST-TC08 | Deleted | Restore | Active (isDeleted=false) | — | — |
| ST-TC09 | Active | Update name + price | Active (new values) | — | — |
| ST-TC10 | Deleted | Attempt to use in sale | ❌ Error | — | — |
| ST-TC11 | Active | Delete → Restore → Delete | Deleted | — | — |

---

## 3. Sale Payment Status — States & Transitions

### State Diagram

```
                  record full payment
    [UNPAID] ─────────────────────────────────► [PAID]
       │
       │ record partial payment
       ▼
   [PARTIAL] ─── record remaining payment ────► [PAID]
       │
       └───── record more partial ─────────────► [PARTIAL]

   [PAID] is a terminal state — no further transitions
```

### State Transition Table

| Current State | Event | Next State | Condition |
|--------------|-------|-----------|-----------|
| UNPAID | Record full payment (paidAmount = total) | PAID | dueAmount = 0 |
| UNPAID | Record partial payment (paidAmount > 0, < total) | PARTIAL | dueAmount > 0 |
| PARTIAL | Record remaining balance | PAID | dueAmount = 0 |
| PARTIAL | Record additional partial | PARTIAL | dueAmount still > 0 |
| PAID | — (terminal state) | PAID | No further change |

### Test Cases

| TC# | Initial State | Payment Recorded | Expected State | Actual | Pass/Fail |
|-----|-------------|-----------------|---------------|----|--|
| ST-TC12 | UNPAID (due=1000) | Partial: 400 | PARTIAL (due=600) | — | — |
| ST-TC13 | UNPAID (due=1000) | Full: 1000 | PAID (due=0) | — | — |
| ST-TC14 | PARTIAL (due=600) | Remaining: 600 | PAID (due=0) | — | — |
| ST-TC15 | PARTIAL (due=600) | Small: 100 | PARTIAL (due=500) | — | — |
| ST-TC16 | PAID | Additional attempt | PAID (unchanged) | — | — |

---

## State Transition Summary

| Module | States | Transitions | Test Cases |
|--------|--------|------------|-----------|
| Customer Account | 2 (Active, Inactive) | 5 | 6 |
| Product Lifecycle | 2 (Active, Deleted) | 5 | 5 |
| Sale Payment Status | 3 (UNPAID, PARTIAL, PAID) | 5 | 5 |
| **Total** | **7** | **15** | **16** |

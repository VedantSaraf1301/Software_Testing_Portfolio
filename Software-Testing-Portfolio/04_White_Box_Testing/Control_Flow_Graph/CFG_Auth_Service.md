# Control Flow Graph — Auth Service Functions

**File Analysed:** `Backend/src/services/auth.service.js`
**Functions:** `loginUser()` and `registerUser()`
**Tester:** Student 2 — Test Engineer

---

## Function 1: loginUser()

### Source Code

```javascript
// Backend/src/services/auth.service.js

const loginUser = async (loginData) => {
  const { email, password } = loginData;        // Node 1

  if (!email || !password) {                    // Node 2 — Decision D1
    throw new Error("Email and Password are required");  // Node 3
  }

  const user = await User.findOne({             // Node 4
    email: email.toLowerCase().trim(),
  });

  if (!user) {                                  // Node 5 — Decision D2
    throw new Error("Invalid Email or Password"); // Node 6
  }

  const isPasswordMatched = await bcrypt.compare(  // Node 7
    password,
    user.password
  );

  if (!isPasswordMatched) {                     // Node 8 — Decision D3
    throw new Error("Invalid Email or Password"); // Node 9
  }

  const token = generateToken(user._id);        // Node 10
  const userData = user.toObject();             // Node 11
  delete userData.password;

  return { user: userData, token };             // Node 12 — Exit
};
```

### Control Flow Graph (ASCII)

```
[1] Extract email, password from loginData
         |
         v
[2] Decision: (!email || !password)?
    /              \
  YES               NO
   |                 |
[3] throw Error    [4] DB: User.findOne(email)
"fields required"    |
   |                 v
   |           [5] Decision: (!user)?
   |               /        \
   |             YES          NO
   |              |            |
   |           [6] throw    [7] bcrypt.compare(pass, hash)
   |           Error          |
   |              |           v
   |              |     [8] Decision: (!isPasswordMatched)?
   |              |          /        \
   |              |        YES         NO
   |              |         |           |
   |              |      [9] throw   [10] generateToken(userId)
   |              |      Error          |
   |              |         |        [11] Build userData, delete password
   |              |         |           |
   +──────────────+---------+        [12] return {user, token}
                                          |
                                         END
```

### Graph Properties

| Property | Value |
|---------|-------|
| Total Nodes (N) | 12 |
| Total Edges (E) | 13 |
| Connected Components (P) | 1 |
| **Cyclomatic Complexity V(G)** | **E − N + 2P = 13 − 12 + 2 = 3** |

> V(G) = 3 decisions + 1 = **4 independent basis paths**

---

## Function 2: registerUser()

### Source Code

```javascript
const registerUser = async (registerData) => {
  const { name, email, password } = registerData;      // Node 1

  if (!name || !email || !password) {                  // Node 2 — Decision D1
    throw new Error("Name, Email and Password are required");  // Node 3
  }

  const existing = await User.findOne({ email });      // Node 4

  if (existing) {                                      // Node 5 — Decision D2
    throw new Error("An account with this email already exists"); // Node 6
  }

  if (password.length < 6) {                           // Node 7 — Decision D3
    throw new Error("Password must be at least 6 characters");   // Node 8
  }

  const hashed = await bcrypt.hash(password, 10);     // Node 9
  const user = await User.create({ name, email, password: hashed }); // Node 10
  const token = generateToken(user._id);              // Node 11
  const userData = user.toObject();                   // Node 12
  delete userData.password;

  return { user: userData, token };                   // Node 13 — Exit
};
```

### Control Flow Graph (ASCII)

```
[1] Extract name, email, password
         |
         v
[2] Decision: (!name || !email || !password)?
    /              \
  YES               NO
   |                 |
[3] throw Error    [4] DB: User.findOne(email)
"fields required"    |
   |                 v
   |           [5] Decision: (existing)?
   |               /        \
   |             YES          NO
   |              |            |
   |           [6] throw    [7] Decision: (password.length < 6)?
   |           Error          /        \
   |              |         YES         NO
   |              |          |           |
   |              |       [8] throw   [9] bcrypt.hash(password, 10)
   |              |       Error          |
   |              |          |        [10] User.create({...})
   |              |          |           |
   |              |          |        [11] generateToken(user._id)
   |              |          |           |
   |              |          |        [12] Build userData
   |              |          |           |
   +──────────────+----------+        [13] return {user, token}
                                           |
                                          END
```

### Graph Properties

| Property | Value |
|---------|-------|
| Total Nodes (N) | 13 |
| Total Edges (E) | 14 |
| Connected Components (P) | 1 |
| **Cyclomatic Complexity V(G)** | **E − N + 2P = 14 − 13 + 2 = 3** |

> V(G) = 3 decisions + 1 = **4 independent basis paths**

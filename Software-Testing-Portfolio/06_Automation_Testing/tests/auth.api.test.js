// ============================================================
// Inventro — Jest + Supertest API Automation Tests
// File: auth.api.test.js
// Module: Authentication API
// Tool: Jest + Supertest
// Tester: Student 3 — Automation & QA Engineer
// ============================================================

const request = require('supertest');

const BASE_URL = 'http://localhost:9696';

// Store token across tests
let authToken = '';
const testEmail = `auto_${Date.now()}@test.com`;
const testPassword = 'pass123';

// ─────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────
describe('POST /api/auth/register', () => {

  // TC-API-01
  test('should register a new user with valid data', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({ name: 'Auto User', email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user).toHaveProperty('email', testEmail.toLowerCase());
    expect(res.body.data.user).not.toHaveProperty('password');

    authToken = res.body.data.token; // save for later tests
  });

  // TC-API-02
  test('should reject duplicate email registration', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({ name: 'Dupe User', email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already exists/i);
  });

  // TC-API-03
  test('should reject registration with missing name', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({ email: 'noname@test.com', password: testPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // TC-API-04
  test('should reject registration with password shorter than 6 chars', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({ name: 'Short Pass', email: 'short@test.com', password: 'abc' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/6 characters/i);
  });

  // TC-API-05
  test('should reject empty request body', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

});

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
describe('POST /api/auth/login', () => {

  // TC-API-06
  test('should login with valid credentials', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user.email).toBe(testEmail.toLowerCase());

    authToken = res.body.data.token;
  });

  // TC-API-07
  test('should reject login with wrong password', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/invalid/i);
  });

  // TC-API-08
  test('should reject login with unregistered email', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'ghost@nowhere.com', password: testPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // TC-API-09
  test('should reject login with empty body', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

});

// ─────────────────────────────────────────
// PROFILE (Protected Route)
// ─────────────────────────────────────────
describe('GET /api/auth/profile', () => {

  // TC-API-10
  test('should return user profile with valid token', async () => {
    const res = await request(BASE_URL)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.data).not.toHaveProperty('password');
  });

  // TC-API-11
  test('should return 401 without token', async () => {
    const res = await request(BASE_URL)
      .get('/api/auth/profile');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // TC-API-12
  test('should return 401 with invalid token', async () => {
    const res = await request(BASE_URL)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer thisisnotavalidtoken');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

});

import http from 'k6/http';
import { check, sleep, group } from 'k6';

// k6 Load Test Configuration
export const options = {
  stages: [
    { duration: '10s', target: 20 },  // Ramp-up to 20 users
    { duration: '30s', target: 50 },  // Sustained load at 50 users
    { duration: '20s', target: 100 }, // Peak load at 100 users
    { duration: '10s', target: 0 },   // Ramp-down to 0
  ],
  thresholds: {
    // 95% of requests must be under 200ms
    http_req_duration: ['p(95)<200', 'p(99)<400'],
    // HTTP failure rate should be less than 1%
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  // Scenario 1: Healthcheck & Observability (Liveness & Readiness)
  group('Health & Readiness Probes', function () {
    const healthRes = http.get(`${BASE_URL}/healthz`);
    check(healthRes, {
      'healthz status is 200': (r) => r.status === 200,
      'healthz body has UP': (r) => r.body.includes('UP'),
    });

    const readyRes = http.get(`${BASE_URL}/readyz`);
    check(readyRes, {
      'readyz status is 200 or 503': (r) => r.status === 200 || r.status === 503,
    });
  });

  // Scenario 2: Register & Authenticate User Flow
  group('Authentication Flow', function () {
    const randomId = Math.floor(Math.random() * 10000000);
    const email = `testuser_${randomId}@example.com`;
    const password = 'Password123!';

    const registerPayload = JSON.stringify({
      email: email,
      password: password,
      full_name: `Test Client ${randomId}`,
      role: 'client',
      phone: '+628123456789',
    });

    const headers = { 'Content-Type': 'application/json' };

    // Register
    const regRes = http.post(`${BASE_URL}/api/v1/auth/register`, registerPayload, { headers });
    const regSuccess = check(regRes, {
      'register status is 201 or 409': (r) => r.status === 201 || r.status === 409,
    });

    if (regRes.status === 201) {
      const regBody = JSON.parse(regRes.body);
      const accessToken = regBody.data?.tokens?.access_token;

      // Access Authenticated Endpoint /auth/me
      if (accessToken) {
        const authHeaders = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };

        const meRes = http.get(`${BASE_URL}/api/v1/auth/me`, { headers: authHeaders });
        check(meRes, {
          'auth me status is 200': (r) => r.status === 200,
          'auth me returns correct email': (r) => JSON.parse(r.body).data?.email === email,
        });

        // List sessions
        const sessionsRes = http.get(`${BASE_URL}/api/v1/sessions`, { headers: authHeaders });
        check(sessionsRes, {
          'get sessions status is 200': (r) => r.status === 200,
        });
      }
    }
  });

  sleep(1);
}

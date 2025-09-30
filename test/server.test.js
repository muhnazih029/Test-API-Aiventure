const request = require('supertest');
const app = require('../src/server');

describe('Server Tests', () => {
  it('GET / - harus mengembalikan pesan welcome', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Welcome to the Ai-venture API');
  });
});

import supertest from 'supertest';
import app from '../../../src/index';

const request = supertest(app);

describe('Test API endpoints', () => {
  // Tests that a valid request returns a 200 OK status
  it('should return a 200 OK status for a valid request', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    );
    expect(response.status).toBe(200);
  });

  // Tests that a request missing a required parameter returns a 400 Bad Request
  it('should return a 400 Bad Request status for a missing parameter', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200'); // Missing height
    expect(response.status).toBe(400);
  });

  // Tests that requesting a non-existent image returns a 404 Not Found
  it('should return a 404 Not Found status for a non-existing image', async () => {
    const response = await request.get(
      '/api/images?filename=nonexistent&width=200&height=200',
    );
    expect(response.status).toBe(404);
  });

  // Tests that invalid dimensions (negative width) return a 400 Bad Request
  it('should return a 400 Bad Request for invalid dimensions', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=-200&height=200',
    );
    expect(response.status).toBe(400);
  });
});

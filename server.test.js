const request = require('supertest');
const app = require('./server');

describe('Product API', () => {
    test('GET /api/products returns products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('GET /api/products/search?name=laptop returns matching product', async () => {
        const res = await request(app).get('/api/products/search?name=laptop');
        expect(res.statusCode).toBe(200);
        expect(res.body.count).toBeGreaterThan(0);
    });

    test('GET /api/products/stats returns category stats', async () => {
        const res = await request(app).get('/api/products/stats');
        expect(res.statusCode).toBe(200);
        expect(res.body.byCategory).toHaveProperty('electronics');
    });
});

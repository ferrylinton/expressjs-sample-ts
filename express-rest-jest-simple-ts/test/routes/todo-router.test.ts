import assert from 'assert';
import request from 'supertest';

// Aplikasi Express yang akan dites
import app from '../../src/app';


describe('Simple', function () {

    describe('GET /api/todoes', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .get('/api/todoes')       // memanggil path '/'
                .expect(200);   // cek status = 200
            assert(response.body.method, 'GET'); // cek di response, message = 'OK'
        });

    });

    describe('GET /api/todoes/123', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .get('/api/todoes/123')       // memanggil path '/'
                .expect(200);   // cek status = 200

            assert(response.body.id, '123'); // cek di response, message = 'OK'
        });

    });

    describe('POST /api/todoes', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .post('/api/todoes')       // memanggil path '/'
                .send({name: 'john'})
                .set('Accept', 'application/json')
                .expect(201);   // cek status = 200

            assert(response.body.body.name, 'john'); // cek di response, message = 'OK'
        });

    });

    describe('PUT /api/todoes/123', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .put('/api/todoes/123')       // memanggil path '/'
                .send({name: 'john'})
                .set('Accept', 'application/json')
                .expect(200);   // cek status = 200

            assert(response.body.body.name, 'john'); // cek di response, message = 'OK'
        });

    });

    describe('PUT /api/todoes/123', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .delete('/api/todoes/123')       // memanggil path '/'
                .expect(200);   // cek status = 200

            assert(response.body.id, '123'); // cek di response, message = 'OK'
        });

    });

    describe('GET /api/xxx', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .delete('/api/xxx')       // memanggil path '/'
                .expect(404);   // cek status = 200

            assert(response.body.message, 'Resource is not found'); // cek di response, message = 'OK'
        });

    });

    describe('GET /api/todoes/0', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .get('/api/todoes/0')       // memanggil path '/'
                .expect(500);   // cek status = 200

            assert(response.body.message, 'id is 0'); // cek di response, message = 'OK'
        });

    });

});

import assert from 'assert';
import request from 'supertest';

// Aplikasi Express yang akan dites
import app from '../../src/app';


describe('Simple', function () {

    describe('GET /', function () {

        it('responds with json', async function () {
            const response = await request(app)
                .get('/')       // memanggil path '/'
                .expect(200);   // cek status = 200

            assert(response.body.message, 'OK'); // cek di response, message = 'OK'
        });

    });

});

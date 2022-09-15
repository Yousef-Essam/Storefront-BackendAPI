import app from '../../server'
import supertest from 'supertest'
import TokenStore from '../assets/TokenStore'

const token = new TokenStore()
const request = supertest(app)

describe('Testing Orders Endpoints', () => {
    describe('Testing Show Active Orders Endpoint', () => {
        it('should fail for requiring the Authorization Token', async () => {
            const response = await request.get('/orders/active');

            expect(response.status).toBe(401);
        })

        it('should successfully show the active orders of the user', async () => {
            const response = await request.get('/orders/active').set('Authorization', 'Bearer ' + await token.importToken());

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {id: 2}
            ])
        })
    })

    describe('Testing Show Complete Orders Endpoint', () => {
        it('should fail for requiring the Authorization Token', async () => {
            const response = await request.get('/orders/complete');

            expect(response.status).toBe(401);
        })

        it('should successfully show the complete orders of the user', async () => {
            const response = await request.get('/orders/complete').set('Authorization', 'Bearer ' + await token.importToken());

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {id: 3}
            ])
        })
    })


    afterAll(() => {
        token.deleteToken()
    })
})
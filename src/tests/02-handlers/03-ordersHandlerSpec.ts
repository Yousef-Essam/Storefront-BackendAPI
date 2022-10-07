import app from '../../server'
import supertest from 'supertest'
import TokenStore from '../assets/TokenStore'
import dropDb from '../assets/dropDb'

const token = new TokenStore()
const request = supertest(app)

describe('Testing Orders Endpoints', () => {
    describe('Testing Create Orders Endpoint', () => {
        it('should fail for requiring Authorization Token', async () => {
            const response = await request
                .post('/orders')
                .send({ products: [{ product_id: 2, quantity: 2 }] })

            expect(response.status).toBe(401)
        })
        it('should fail for the absence of products array', async () => {
            const response = await request
                .post('/orders')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ someKey: 'blabla' })

            expect(response.status).toBe(400)
        })

        it('should successfully create order', async () => {
            const response = await request
                .post('/orders')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ products: [{ product_id: 2, quantity: 2 }] })

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order_id: 1,
                products: [
                    {
                        id: 2,
                        name: 'Product2',
                        price: 750,
                        category: 'category1',
                        quantity: 2,
                    },
                ],
            })
        })

        it('should successfully create another order', async () => {
            const response = await request
                .post('/orders')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ products: [{ product_id: 1, quantity: 3 }] })

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order_id: 2,
                products: [
                    {
                        id: 1,
                        name: 'Product1',
                        price: 500,
                        category: 'category1',
                        quantity: 3,
                    },
                ],
            })
        })
    })

    describe('Testing Add Products To Orders Endpoint', () => {
        it('should fail for requiring Authorization Token', async () => {
            const response = await request
                .post('/orders/1')
                .send({ products: [{ product_id: 2, quantity: 2 }] })

            expect(response.status).toBe(401)
        })

        it('should fail because there is no order with this id', async () => {
            const response = await request
                .post('/orders/3')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ products: [{ product_id: 2, quantity: 2 }] })

            expect(response.status).toBe(404)
        })

        it('should fail for the absence of products array', async () => {
            const response = await request
                .post('/orders/1')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ someKey: 'blabla' })

            expect(response.status).toBe(400)
        })

        it('should fail for addition of an already added product', async () => {
            const response = await request
                .post('/orders/1')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ products: [{ product_id: 2, quantity: 2 }] })

            expect(response.status).toBe(400)
        })

        it('should successfully add a product to the order', async () => {
            const response = await request
                .post('/orders/1')
                .set('Authorization', 'Bearer ' + (await token.importToken()))
                .send({ products: [{ product_id: 3, quantity: 1 }] })

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order_id: 1,
                products: [
                    {
                        id: 2,
                        name: 'Product2',
                        price: 750,
                        category: 'category1',
                        quantity: 2,
                    },
                    {
                        id: 3,
                        name: 'Product3',
                        price: 1000,
                        category: 'category2',
                        quantity: 1,
                    },
                ],
            })
        })
    })

    describe('Testing Finish Order Endpoint', () => {
        it('should fail for requiring the Authorization Token', async () => {
            const response = await request.get('/orders/1/finish')

            expect(response.status).toBe(401)
        })

        it('should fail because there is no order with id of 3', async () => {
            const response = await request
                .get('/orders/3/finish')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(404)
        })

        it('should successfully finish the order of id 1', async () => {
            const response = await request
                .get('/orders/1/finish')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order_id: 1,
                products: [
                    {
                        id: 2,
                        name: 'Product2',
                        price: 750,
                        category: 'category1',
                        quantity: 2,
                    },
                    {
                        id: 3,
                        name: 'Product3',
                        price: 1000,
                        category: 'category2',
                        quantity: 1,
                    },
                ],
            })
        })

        it('should be forbidden since the order is already complete', async () => {
            const response = await request
                .get('/orders/1/finish')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(403)
        })
    })

    describe('Testing Show Certain Order Endpoint', () => {
        it('should fail for requiring the Authorization Token', async () => {
            const response = await request.get('/orders/1')

            expect(response.status).toBe(401)
        })

        it('should fail because there is no order with id of 3', async () => {
            const response = await request
                .get('/orders/3')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(404)
        })

        it('should successfully show the order of id 1', async () => {
            const response = await request
                .get('/orders/1')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order_id: 1,
                status: 'complete',
                products: [
                    {
                        id: 2,
                        name: 'Product2',
                        price: 750,
                        category: 'category1',
                        quantity: 2,
                    },
                    {
                        id: 3,
                        name: 'Product3',
                        price: 1000,
                        category: 'category2',
                        quantity: 1,
                    },
                ],
            })
        })

        it('should successfully show the order of id 2', async () => {
            const response = await request
                .get('/orders/2')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order_id: 2,
                status: 'active',
                products: [
                    {
                        id: 1,
                        name: 'Product1',
                        price: 500,
                        category: 'category1',
                        quantity: 3,
                    },
                ],
            })
        })
    })

    describe('Testing Show Active Orders Endpoint', () => {
        it('should fail for requiring the Authorization Token', async () => {
            const response = await request.get('/orders/active')

            expect(response.status).toBe(401)
        })

        it('should successfully show the active orders of the user', async () => {
            const response = await request
                .get('/orders/active')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual([{ id: 2 }])
        })
    })

    describe('Testing Show Complete Orders Endpoint', () => {
        it('should fail for requiring the Authorization Token', async () => {
            const response = await request.get('/orders/complete')

            expect(response.status).toBe(401)
        })

        it('should successfully show the complete orders of the user', async () => {
            const response = await request
                .get('/orders/complete')
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual([{ id: 1 }])
        })
    })

    describe('Advanced Orders Endpoint Testing', () => {
        it('should authenticate another user successfully', async () => {
            const response = await request.post('/users/auth').send({
                firstname: 'User2',
                lastname: 'Biden',
                password: 'asdfgh456',
            })

            expect(response.status).toBe(200)
            expect(response.body.id).toBe(2)
            token.exportToken(response.body.token)
        })

        it('should fail for requiring authoriztion token', async () => {
            const response = await request.get('/orders/1');

            expect(response.status).toBe(401)
        })

        it('should be forbidden to show order since this order does not belong to this user', async () => {
            const response = await request.get('/orders/1').set('Authorization', 'Bearer ' + await token.importToken());

            expect(response.status).toBe(403)
        })

        it('should fail for requiring authoriztion token', async () => {
            const response = await request.post('/orders/1').send({
                products: [
                    {
                        product_id: 1,
                        quantity: 4
                    }
                ]
            });

            expect(response.status).toBe(401)
        })

        it('should be forbidden to add products since this order does not belong to this user', async () => {
            const response = await request.post('/orders/1').set('Authorization', 'Bearer ' + await token.importToken()).send({
                products: [
                    {
                        product_id: 1,
                        quantity: 4
                    }
                ]
            });

            expect(response.status).toBe(403)
        })
    })

    afterAll(() => {
        token.deleteToken()
        dropDb()
    })
})

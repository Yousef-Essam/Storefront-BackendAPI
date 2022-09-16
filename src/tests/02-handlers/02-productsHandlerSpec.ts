import app from '../../server'
import supertest from 'supertest'
import TokenStore from '../assets/TokenStore'
import { Request } from 'express'

const token = new TokenStore()
const request = supertest(app)

describe('Testing Products Endpoints', () => {
    describe('Testing the Create Product Endpoint', () => {
        it('should fail because Authorization Token is Required', async () => {
            const response = await request.post('/products').send({
                name: 'Product6',
                price: 2000,
                category: 'category3',
            })

            expect(response.status).toBe(401)
        })

        it('should fail because the name is required', async () => {
            const response = await request
                .post('/products')
                .send({
                    price: 500,
                    category: 'category3',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(400)
        })

        it('should fail because the price is required', async () => {
            const response = await request
                .post('/products')
                .send({
                    name: 'Product6',
                    category: 'category3',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(400)
        })

        it('should fail because the category is required', async () => {
            const response = await request
                .post('/products')
                .send({
                    name: 'Product6',
                    price: 500,
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(400)
        })

        it('should fail because the price is not a number', async () => {
            const response = await request
                .post('/products')
                .send({
                    name: 'Product6',
                    price: 'blabla',
                    category: 'category3',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(400)
        })

        it('should fail because the price is not a positive number', async () => {
            const response = await request
                .post('/products')
                .send({
                    name: 'Product6',
                    price: -1000,
                    category: 'category3',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(400)
        })

        it('should create the product successfully', async () => {
            const response = await request
                .post('/products')
                .send({
                    name: 'Product1',
                    price: 500,
                    category: 'category1',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                id: 1,
                name: 'Product1',
                price: 500,
                category: 'category1',
            })
        })

        it('should create another 3 products successfully', async () => {
            await request
                .post('/products')
                .send({
                    name: 'Product2',
                    price: 750,
                    category: 'category1',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            await request
                .post('/products')
                .send({
                    name: 'Product3',
                    price: 1000,
                    category: 'category2',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            const response = await request
                .post('/products')
                .send({
                    name: 'Product4',
                    price: 1500,
                    category: 'category2',
                })
                .set('Authorization', 'Bearer ' + (await token.importToken()))

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                id: 4,
                name: 'Product4',
                price: 1500,
                category: 'category2',
            })
        })
    })

    describe('Testing the Index (Show All Products) Endpoint', () => {
        it('should get all products successfully', async () => {
            const response = await request.get('/products')

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(4)
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Product1',
                    price: 500,
                    category: 'category1',
                },
                {
                    id: 2,
                    name: 'Product2',
                    price: 750,
                    category: 'category1',
                },
                {
                    id: 3,
                    name: 'Product3',
                    price: 1000,
                    category: 'category2',
                },
                {
                    id: 4,
                    name: 'Product4',
                    price: 1500,
                    category: 'category2',
                },
            ])
        })
    })

    describe('Testing the Show Certain Product Endpoint', () => {
        it('should get product of id 1 successfully', async () => {
            const response = await request.get('/products/1')

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                name: 'Product1',
                price: 500,
                category: 'category1',
            })
        })

        it('should get product of id 2 successfully', async () => {
            const response = await request.get('/products/2')

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                name: 'Product2',
                price: 750,
                category: 'category1',
            })
        })

        it('should get product of id 3 successfully', async () => {
            const response = await request.get('/products/3')

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                name: 'Product3',
                price: 1000,
                category: 'category2',
            })
        })
    })

    describe('Testing the Show Product By Category Endpoint', () => {
        it('should get product of category "category1" successfully', async () => {
            const response = await request.get('/products/category/category1')

            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Product1',
                    price: 500,
                },
                {
                    id: 2,
                    name: 'Product2',
                    price: 750,
                },
            ])
        })

        it('should get product of category "category2" successfully', async () => {
            const response = await request.get('/products/category/category2')

            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                    id: 3,
                    name: 'Product3',
                    price: 1000,
                },
                {
                    id: 4,
                    name: 'Product4',
                    price: 1500,
                },
            ])
        })
    })
})

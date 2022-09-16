import { execSync } from 'child_process'
import { Product, ProductStore } from '../../models/product'
import resetDb from '../assets/setupDB'

const store = new ProductStore()

describe('Product Model Testing', () => {
    beforeAll(() => {
        resetDb();
    })
    describe('Checking the existence of model methods', () => {
        it('should have a create method', () => {
            expect(store.create).toBeDefined()
        })

        it('should have a read method', () => {
            expect(store.read).toBeDefined()
        })

        it('should have an update method', () => {
            expect(store.update).toBeDefined()
        })

        it('should have a delete method', () => {
            expect(store.delete).toBeDefined()
        })
    })

    describe('Basic Product Model Testing', () => {
        it('create method of the model should add a product', async () => {
            const result = await store.create({
                name: 'Product1',
                price: 500,
                category: 'Generic Category',
            })

            expect(result).toEqual({
                id: 1,
                name: 'Product1',
                price: 500,
                category: 'Generic Category',
            })
        })

        it('read method of the model should return a list of products', async () => {
            const result = await store.read('*')

            expect(result).toEqual([
                {
                    id: 1,
                    name: 'Product1',
                    price: 500,
                    category: 'Generic Category',
                },
            ])
        })

        it('update method of the model should update the product name', async () => {
            const result = await store.update({ name: 'Device1' }, { id: 1 })

            expect(result[0]).toEqual({
                id: 1,
                name: 'Device1',
                price: 500,
                category: 'Generic Category',
            })
        })

        it('delete method of the model should empty the table', async () => {
            await store.delete()

            const result = await store.read('*')

            expect(result).toEqual([])
        })

        it('should create two sample products for testing other models and handlers', async () => {
            await store.create({
                name: 'Product2',
                price: 500,
                category: 'category1',
            })
            await store.create({
                name: 'Product3',
                price: 750,
                category: 'category1',
            })
            await store.create({
                name: 'Product4',
                price: 1000,
                category: 'category2',
            })
            await store.create({
                name: 'Product5',
                price: 1500,
                category: 'category2',
            })

            const result = await store.read('*')

            expect(result).toEqual([
                {
                    id: 2,
                    name: 'Product2',
                    price: 500,
                    category: 'category1',
                },
                {
                    id: 3,
                    name: 'Product3',
                    price: 750,
                    category: 'category1',
                },
                {
                    id: 4,
                    name: 'Product4',
                    price: 1000,
                    category: 'category2',
                },
                {
                    id: 5,
                    name: 'Product5',
                    price: 1500,
                    category: 'category2',
                },
            ])
        })
    })
})

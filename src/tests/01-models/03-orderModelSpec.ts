import { Dashboard } from '../../models/dashboard'
import { Order, OrderStore } from '../../models/order'

const store = new OrderStore()
const dash = new Dashboard()

describe('Order Model Testing', async () => {
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

        it('should have an addProduct method', () => {
            expect(store.addProduct).toBeDefined()
        })
    })

    describe('Basic Order Model Testing', () => {
        it('create method of the model should add an active order', async () => {
            const result = await store.create({
                user_id: 2,
                status: 'active',
            })

            expect(result).toEqual({
                id: 1,
                user_id: 2,
                status: 'active',
            })
        })

        it('create method of the model should add an active order', async () => {
            const result = await store.create({
                user_id: 2,
                status: 'active',
            })

            expect(result).toEqual({
                id: 2,
                user_id: 2,
                status: 'active',
            })
        })

        it('create method of the model should add a complete order', async () => {
            const result = await store.create({
                user_id: 2,
                status: 'complete',
            })

            expect(result).toEqual({
                id: 3,
                user_id: 2,
                status: 'complete',
            })
        })

        it('read method of the model should return a list of orders', async () => {
            const result = await store.read('*')

            expect(result).toEqual([
                {
                    id: 1,
                    user_id: 2,
                    status: 'active',
                },
                {
                    id: 2,
                    user_id: 2,
                    status: 'active',
                },
                {
                    id: 3,
                    user_id: 2,
                    status: 'complete',
                }
            ])
        })
    })

    describe('Basic Order Modification Tests', () => {
        it('addProduct method of the model should successfully add products to an active order', async () => {
            await store.addProduct({ order_id: 1, product_id: 2, quantity: 1 })
            await store.addProduct({ order_id: 1, product_id: 4, quantity: 2 })

            const result = await dash.readOrderProducts(1)
            expect(result).toEqual([
                {
                    id: 2,
                    name: 'Product2',
                    price: 500,
                    category: 'category1',
                    quantity: 1,
                },
                {
                    id: 4,
                    name: 'Product4',
                    price: 1000,
                    category: 'category2',
                    quantity: 2,
                },
            ])
        })

        it('addProduct method of the model should fail to add products due to adding the same product again', async () => {
            await expectAsync(
                store.addProduct({ order_id: 1, product_id: 2, quantity: 1 })
            ).toBeRejected()
        })

        it('addProduct method of the model should fail to add products to a complete order', async () => {
            await expectAsync(
                store.addProduct({ order_id: 3, product_id: 2, quantity: 1 })
            ).toBeRejected()
        })

        it('update method of the model should change the status of the order', async () => {
            const result = await store.update({ status: 'complete' }, { id: 1 })

            expect(result[0]).toEqual({
                id: 1,
                user_id: 2,
                status: 'complete',
            })
        })
    })

    describe('delete method of the model should delete the order and its products', () => {
        it('order should be deleted from the orders table', async () => {
            await store.delete({ id: 1 })
            const result = await store.read('*')
            expect(result).toEqual([
                {
                    id: 2,
                    user_id: 2,
                    status: 'active',
                },
                {
                    id: 3,
                    user_id: 2,
                    status: 'complete',
                },
            ])
        })

        it('order products should be deleted from the orders_products table', async () => {
            const orderProd = await dash.readOrderProducts(1)
            expect(orderProd).toEqual([])
        })
    })
})

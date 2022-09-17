import express, { Request, Response } from 'express'
import { request } from 'http'
import verifyAuthToken from '../middleware/verifyAuthToken'
import { Dashboard } from '../models/dashboard'
import { OrderStore } from '../models/order'

const router = express.Router()
const store = new OrderStore()
const dash = new Dashboard()

const createOrder = async (req: Request, res: Response) => {
    if (!req.body.products) {
        res.status(400).json('Products Required.')
        return
    }

    const order = await store.create({
        user_id: parseInt(req.params.tokenUserID),
        status: 'active',
    })

    for (let product of req.body.products) {
        if (!product.product_id || !product.quantity) {
            res.status(400).json('Product Detail Missing.')
            return
        }
        product.order_id = order.id
        await store.addProduct(product)
    }

    const orderDetails = {
        order_id: order.id,
        products: await dash.readOrderProducts(order.id as number),
    }
    res.json(orderDetails)
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const order = (
            await store.read('*', { id: parseInt(req.params.order_id) })
        )[0]
        if (!order) {
            res.status(404).json(`An order with this ID does not exist.`)
            return
        }

        if (order.user_id !== parseInt(req.params.tokenUserID)) {
            res.status(403).json(
                `Can not modify this order. This order does not belong to this user.`
            )
            return
        }

        if (order.status === 'complete') {
            res.status(403).json(
                `Can not add products to this order. This order is already complete.`
            )
            return
        }

        for (let product of req.body.products) {
            if (!product.product_id || !product.quantity) {
                res.status(400).json('Product Detail Missing.')
                return
            }
            product.order_id = order.id
            await store.addProduct(product)
        }

        const orderDetails = {
            order_id: order.id,
            products: await dash.readOrderProducts(order.id as number),
        }
        res.json(orderDetails)
    } catch (err) {
        res.status(400).json(
            'A product you requested to add was already found in your order. Please check your order first before adding more products.'
        )
    }
}

const showOrder = async (req: Request, res: Response) => {
    const order = (
        await store.read('*', { id: parseInt(req.params.order_id) })
    )[0]
    if (!order) {
        res.status(404).json(`An order with this ID does not exist.`)
        return
    }

    if (order.user_id !== parseInt(req.params.tokenUserID)) {
        res.status(403).json(
            `Can not show this order. This order does not belong to this user.`
        )
        return
    }

    const orderDetails = {
        order_id: order.id,
        status: order.status,
        products: await dash.readOrderProducts(order.id as number),
    }
    res.json(orderDetails)
}

const finish = async (req: Request, res: Response) => {
    let order = (
        await store.read('*', { id: parseInt(req.params.order_id) })
    )[0]

    if (!order) {
        res.status(404).json(`An order with this ID does not exist.`)
        return
    }

    if (order.user_id !== parseInt(req.params.tokenUserID)) {
        res.status(403).json(
            `Can not modify this order. This order does not belong to this user.`
        )
        return
    }

    if (order.status === 'complete') {
        res.status(403).json(`Order is already finished.`)
        return
    }

    order = (
        await store.update(
            { status: 'complete' },
            { id: parseInt(req.params.order_id) }
        )
    )[0]

    const orderDetails = {
        order_id: order.id,
        products: await dash.readOrderProducts(order.id as number),
    }
    res.json(orderDetails)
}

const active = async (req: Request, res: Response) => {
    const orders = await store.read(['id'], {
        status: 'active',
        user_id: parseInt(req.params.tokenUserID),
    })

    res.json(orders)
}

const complete = async (req: Request, res: Response) => {
    const orders = await store.read(['id'], {
        status: 'complete',
        user_id: parseInt(req.params.tokenUserID),
    })

    res.json(orders)
}

router.get('/active', verifyAuthToken, active)
router.get('/complete', verifyAuthToken, complete)
router.get('/:order_id', verifyAuthToken, showOrder)
router.get('/:order_id/finish', verifyAuthToken, finish)
router.post('/create', verifyAuthToken, createOrder)
router.post('/:order_id', verifyAuthToken, addProduct)

export default router

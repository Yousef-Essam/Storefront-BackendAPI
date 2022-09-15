import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken'
import { Dashboard } from '../models/dashboard'
import { ProductStore } from '../models/product'

const router = express.Router()
const store = new ProductStore()
const dash = new Dashboard()

const index = async (req: Request, res: Response) => {
    res.json(await store.read())
}

const show = async (req: Request, res: Response) => {
    res.json(
        (
            await store.read(['name', 'price', 'category'], {
                id: parseInt(req.params.id),
            })
        )[0]
    )
}

const getTop = async (req: Request, res: Response) => {
    res.json(await dash.topProducts(parseInt(req.params.num)))
}

const category = async (req: Request, res: Response) => {
    res.json(
        await store.read(['id', 'name', 'price'], { category: req.params.cat })
    )
}

const create = async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.price || !req.body.category) {
        res.status(400).json(
            'Missing Product Information. "name", "price" and "category" fields are required.'
        )
        return
    }

    if (isNaN(Number(req.body.price)) || req.body.price <= 0) {
        res.status(400).json('Price Product must be a positive number.')
        return
    }

    const result = await store.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    })
    res.json(result)
}

router.get('/', index)
router.get('/:id', show)
router.get('/top/:num', getTop)
router.post('/', verifyAuthToken, create)
router.get('/category/:cat', category)

export default router

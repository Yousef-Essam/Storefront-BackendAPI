import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken'
import { UserStore } from '../models/user'
import createToken from '../assets/createToken'

const router = express.Router()
const store = new UserStore

const index = async (req: Request, res: Response) => {
    const result = await store.read(['id', 'firstname', 'lastname'])
    res.json(result)
}

const show = async (req: Request, res: Response) => {
    const result = await store.read(['firstname', 'lastname'], {
        id: parseInt(req.params.id),
    })
    res.json(result[0])
}

const create = async (req: Request, res: Response) => {
    const newUser = await store.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    })

    res.json({
        id: newUser.id,
        token: createToken({
            id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        })
    })
}

const authenticate = async (req: Request, res: Response) => {
    const user = await store.authenticate(
        req.body.firstname,
        req.body.lastname,
        req.body.password
    )
    if (user)
        res.json({
            id: user.id,
            token: createToken({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
            })
        })
    else res.status(401).send('Username or password are invalid.')
}

router.get('/', verifyAuthToken, index)
router.get('/:id', verifyAuthToken, show)
router.post('/', create)
router.post('/auth', authenticate)

export default router

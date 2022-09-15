import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const decoded = jwt.verify(
            token as string,
            process.env.TOKEN_SECRET as string
        )
        req.params.tokenUserID = (decoded as JwtPayload).id
        if (process.env.ENV !== 'test')
            console.log(
                `---- REQUEST made by user of id ${req.params.tokenUserID}`
            )
        next()
    } catch (err) {
        res.status(401).send(`Authorization Required ${(<Error>err).message}`)
    }
}

export default verifyAuthToken

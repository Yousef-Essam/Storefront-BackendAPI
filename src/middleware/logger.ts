import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const logger = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.ENV !== 'test')
        console.log(`--- ${req.method} request on ${req.path}`)
    next()
}

export default logger

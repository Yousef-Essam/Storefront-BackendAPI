import { Request, Response, NextFunction } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`--- ${req.method} request on ${req.path}`)
    next()
}

export default logger

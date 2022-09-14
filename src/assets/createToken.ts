import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createToken = (payload: Object) =>
    jwt.sign(payload, process.env.TOKEN_SECRET as Secret)

export default createToken

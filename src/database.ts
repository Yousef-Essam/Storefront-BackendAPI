import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

let Client: Pool = new Pool()

if (process.env.ENV === 'test')
    Client = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_TEST,
        host: process.env.PG_HOST,
    })

if (process.env.ENV === 'dev')
    Client = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
    })

export default Client

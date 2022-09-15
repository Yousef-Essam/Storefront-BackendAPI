import dotenv from 'dotenv'
import express from 'express'
import logger from './middleware/logger'
import usersHandler from './handlers/users'
import productsHandler from './handlers/products'
import ordersHandler from './handlers/orders'

dotenv.config()

const app = express()
const port = 3000

app.use(logger)
app.use(express.json())
app.use('/users', usersHandler)
app.use('/products', productsHandler)
app.use('/orders', ordersHandler)

app.listen(port, () => {
    if (process.env.ENV !== 'test')
        console.log(`-- server listening on port ${port}`)
})

export default app

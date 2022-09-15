import Client from '../database'

export class Dashboard {
    async readOrderProducts(order_id: number) {
        try {
            const conn = await Client.connect()
            const sql = `
                SELECT id, name, price, category, quantity 
                    FROM products INNER JOIN orders_products 
                        ON products.id = orders_products.product_id 
                    WHERE orders_products.order_id = $1;
            `
            const result = await conn.query(sql, [order_id])
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Cannot read products of order with id ${order_id}: ${
                    (<Error>err).message
                }`
            )
        }
    }

    async topProducts(num: number) {
        const conn = await Client.connect()
        const sql = `
        SELECT id, name, price, category, num_orders 
            FROM products INNER JOIN (
                SELECT product_id, COUNT(order_id) AS num_orders 
                    FROM orders_products 
                    GROUP BY product_id 
                    ORDER BY num_orders DESC 
                    LIMIT $1
            ) AS top 
                ON products.id = top.product_id;
        `
        const result = await conn.query(sql, [num])

        conn.release()
        return result.rows
    }
}

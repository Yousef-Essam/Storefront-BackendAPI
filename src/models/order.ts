import Client from '../database'

type OrderProduct = {
    order_id?: number
    product_id?: number
    quantity?: number
}

export type Order = {
    id?: number
    user_id?: number
    status?: 'active' | 'complete'
}

export class OrderStore {
    private static createFilter(filter?: Order): string {
        let filters: string[] = []
        for (let key in filter) {
            if (filter[key as keyof Order] !== undefined) {
                let value = filter[key as keyof Order] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                filters.push(`${key}=${value}`)
            }
        }

        return `${filters.length !== 0 ? ' WHERE ' : ''}${filters.join(
            ' AND '
        )}`
    }

    private static createInsertQuery(newRow: Order): string {
        let columns: string[] = []
        let values: (string | number)[] = []

        for (let key in newRow) {
            if (newRow[key as keyof Order] !== undefined) {
                columns.push(key)
                let value = newRow[key as keyof Order] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                values.push(value)
            }
        }

        return `INSERT INTO orders (${columns.join(
            ', '
        )}) VALUES (${values.join(', ')}) RETURNING *;`
    }

    private static createSelectQuery(
        cols: string[] | '*' = '*',
        filter?: Order
    ): string {
        return `SELECT ${
            cols == '*' ? '*' : cols.join(', ')
        } FROM orders${OrderStore.createFilter(filter)};`
    }

    private static createUpdateQuery(newVals: Order, filter?: Order): string {
        let newV: string[] = []

        for (let key in newVals) {
            if (newVals[key as keyof Order] !== undefined) {
                let value = newVals[key as keyof Order] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                newV.push(`${key}=${value}`)
            }
        }
        let filterString = OrderStore.createFilter(filter)
        return `UPDATE orders SET ${newV.join(
            ', '
        )}${filterString} RETURNING *;`
    }

    private static createDeleteQuery(filter?: Order): string {
        return `DELETE FROM orders${OrderStore.createFilter(filter)};`
    }

    async create(newRow: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
            const query = OrderStore.createInsertQuery(newRow)
            const result = await conn.query(query)
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Can not add new row to Table Orders ${(<Error>err).message}`
            )
        }
    }

    async read(cols: string[] | '*' = '*', filter?: Order): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const query = OrderStore.createSelectQuery(cols, filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not read from Table Orders ${(<Error>err).message}`
            )
        }
    }

    async update(newVals: Order, filter?: Order): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const query = OrderStore.createUpdateQuery(newVals, filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not update Table Orders ${(<Error>err).message}`
            )
        }
    }

    async delete(filter?: Order): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const query = OrderStore.createDeleteQuery(filter)
            const prodQuery = 'DELETE FROM orders_products WHERE order_id = $1;'
            await conn.query(prodQuery, [(filter as Order).id])
            await conn.query(query)
            conn.release()

            return this.read('*')
        } catch (err) {
            throw new Error(
                `Can not delete from Table Orders ${(<Error>err).message}`
            )
        }
    }

    async addProduct(prod: OrderProduct) {
        try {
            if (
                (await this.read(['status'], { id: prod.order_id }))[0]
                    .status === 'complete'
            )
                throw new Error('Order is already complete.')
            const conn = await Client.connect()
            const result = await conn.query(
                `INSERT INTO orders_products (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;`,
                [prod.product_id, prod.order_id, prod.quantity]
            )

            conn.release()
        } catch (err) {
            throw new Error(
                `Cannot add new product to order. ${(<Error>err).message}`
            )
        }
    }
}

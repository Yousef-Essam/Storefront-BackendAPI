import Client from '../database'

export type Product = {
    id?: number
    name?: string
    price?: number
    category?: string
}

export class ProductStore {
    private static createFilter(filter?: Product): string {
        let filters: string[] = []
        for (let key in filter) {
            if (filter[key as keyof Product] !== undefined) {
                let value = filter[key as keyof Product] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                filters.push(`${key}=${value}`)
            }
        }

        return `${filters.length !== 0 ? ' WHERE ' : ''}${filters.join(
            ' AND '
        )}`
    }

    private static createInsertQuery(newRow: Product): string {
        let columns: string[] = []
        let values: (string | number)[] = []

        for (let key in newRow) {
            if (newRow[key as keyof Product] !== undefined) {
                columns.push(key)
                let value = newRow[key as keyof Product] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                values.push(value)
            }
        }

        return `INSERT INTO products (${columns.join(
            ', '
        )}) VALUES (${values.join(', ')}) RETURNING *;`
    }

    private static createSelectQuery(
        cols: string[] | '*' = '*',
        filter?: Product
    ): string {
        return `SELECT ${
            cols == '*' ? '*' : cols.join(', ')
        } FROM products${ProductStore.createFilter(filter)};`
    }

    private static createUpdateQuery(
        newVals: Product,
        filter?: Product
    ): string {
        let newV: string[] = []

        for (let key in newVals) {
            if (newVals[key as keyof Product] !== undefined) {
                let value = newVals[key as keyof Product] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                newV.push(`${key}=${value}`)
            }
        }
        let filterString = ProductStore.createFilter(filter)
        return `UPDATE products SET ${newV.join(', ')}${filterString} RETURNING *;`
    }

    private static createDeleteQuery(filter?: Product): string {
        return `DELETE FROM products${ProductStore.createFilter(filter)};`
    }

    async create(newRow: Product) {
        try {
            const conn = await Client.connect()
            const query = ProductStore.createInsertQuery(newRow)
            const result = await conn.query(query)
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Can not add new row to Table Products ${(<Error>err).message}`
            )
        }
    }

    async read(cols: string[] | '*' = '*', filter?: Product) {
        try {
            const conn = await Client.connect()
            const query = ProductStore.createSelectQuery(cols, filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not read from Table Products ${(<Error>err).message}`
            )
        }
    }

    async update(newVals: Product, filter?: Product) {
        try {
            const conn = await Client.connect()
            const query = ProductStore.createUpdateQuery(newVals, filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not update Table Products ${(<Error>err).message}`
            )
        }
    }

    async delete(filter?: Product) {
        try {
            const conn = await Client.connect()
            const query = ProductStore.createDeleteQuery(filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not delete from Table Products ${(<Error>err).message}`
            )
        }
    }
}

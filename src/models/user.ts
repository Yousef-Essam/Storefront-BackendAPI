import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const pepper = process.env.BCRYPT_PASS
const saltRounds = process.env.SALT_ROUNDS

export type User = {
    id?: number
    firstname?: string
    lastname?: string
    password?: string
}

export class UserStore {
    private static createFilter(filter?: User): string {
        let filters: string[] = []
        for (let key in filter) {
            if (filter[key as keyof User] !== undefined) {
                let value = filter[key as keyof User] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                filters.push(`${key}=${value}`)
            }
        }

        return `${filters.length !== 0 ? ' WHERE ' : ''}${filters.join(
            ' AND '
        )}`
    }

    private static createInsertQuery(newRow: User): string {
        let columns: string[] = []
        let values: (string | number)[] = []

        for (let key in newRow) {
            if (newRow[key as keyof User] !== undefined) {
                columns.push(key)
                let value = newRow[key as keyof User] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                values.push(value)
            }
        }

        return `INSERT INTO users (${columns.join(', ')}) VALUES (${values.join(
            ', '
        )}) RETURNING *;`
    }

    private static createSelectQuery(
        cols: string[] | '*' = '*',
        filter?: User
    ): string {
        return `SELECT ${
            cols == '*' ? '*' : cols.join(', ')
        } FROM users${UserStore.createFilter(filter)};`
    }

    private static createUpdateQuery(newVals: User, filter?: User): string {
        let newV: string[] = []

        for (let key in newVals) {
            if (newVals[key as keyof User] !== undefined) {
                let value = newVals[key as keyof User] as string | number
                value = typeof value === 'string' ? `'${value}'` : value
                newV.push(`${key}=${value}`)
            }
        }
        let filterString = UserStore.createFilter(filter)
        return `UPDATE users SET ${newV.join(', ')}${filterString} RETURNING *;`
    }

    private static createDeleteQuery(filter?: User): string {
        return `DELETE FROM users${UserStore.createFilter(filter)};`
    }

    async create(newRow: User) {
        try {
            const conn = await Client.connect()
            const hash = bcrypt.hashSync(
                (newRow.password as string) + pepper,
                parseInt(saltRounds as string)
            )
            newRow.password = hash
            const query = UserStore.createInsertQuery(newRow)
            const result = await conn.query(query)
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Can not add new row to Table Users ${(<Error>err).message}`
            )
        }
    }

    async read(cols: string[] | '*' = '*', filter?: User) {
        try {
            const conn = await Client.connect()
            const query = UserStore.createSelectQuery(cols, filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not read from Table Users ${(<Error>err).message}`
            )
        }
    }

    async update(newVals: User, filter?: User) {
        try {
            const conn = await Client.connect()
            const query = UserStore.createUpdateQuery(newVals, filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not update Table Users ${(<Error>err).message}`
            )
        }
    }

    async delete(filter?: User) {
        try {
            const conn = await Client.connect()
            const query = UserStore.createDeleteQuery(filter)
            const result = await conn.query(query)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Can not delete from Table Users ${(<Error>err).message}`
            )
        }
    }

    async authenticate(
        firstname: string,
        lastname: string,
        password: string
    ): Promise<User | null> {
        const result = await this.read('*', { firstname, lastname })

        if (result.length) {
            const user = result[0]

            if (bcrypt.compareSync(password + pepper, user.password))
                return user
            else return null
        } else return null
    }
}

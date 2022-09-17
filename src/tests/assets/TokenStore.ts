import fs from 'fs/promises'

export default class TokenStore {
    async importToken(): Promise<string> {
        try {
            return await fs.readFile('src/tests/token.txt', {
                encoding: 'utf8',
            })
        } catch (err) {
            fs.writeFile('src/tests/token.txt', '')
            return ''
        }
    }

    async exportToken(token: string) {
        fs.writeFile('src/tests/token.txt', token)
    }

    async deleteToken() {
        try {
            fs.unlink('src/tests/token.txt')
        } catch (err) {
            return
        }
    }
}
